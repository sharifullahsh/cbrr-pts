using System.IO;
using System.Net;
using System.Text;
using AutoMapper;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using ProjectTrackingSystem.API.Data;
using ProjectTrackingSystem.API.Helpers;
using ProjectTrackingSystem.API.Models;

namespace ProjectTrackingSystem.API {
    public class Startup {
        public Startup (IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services) {
            //Identity Part
            services.AddDbContext<DataContext> (x => {
                x.UseSqlServer (Configuration.GetConnectionString ("DefaultConnection"));
            });

            IdentityBuilder builder = services.AddIdentityCore<User> (opt => {
                opt.Password.RequireDigit = false;
                opt.Password.RequiredLength = 4;
                opt.Password.RequireNonAlphanumeric = false;
                opt.Password.RequireUppercase = false;
                opt.Password.RequireLowercase = false;
            });

            builder = new IdentityBuilder (builder.UserType, typeof (Role), builder.Services);
            builder.AddEntityFrameworkStores<DataContext> ();
            builder.AddRoleValidator<RoleValidator<Role>> ();
            builder.AddRoleManager<RoleManager<Role>> ();
            builder.AddSignInManager<SignInManager<User>> ();

            services.AddAuthentication (JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer (options => {
                    options.TokenValidationParameters = new TokenValidationParameters {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey (Encoding.ASCII
                    .GetBytes (Configuration.GetSection ("AppSettings:Token").Value)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                    };
                });

            // services.AddAuthorization(options =>
            // {
            //     options.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));
            //     options.AddPolicy("ModeratePhotoRole", policy => policy.RequireRole("Admin", "Moderator"));
            //     options.AddPolicy("VipOnly", policy => policy.RequireRole("VIP"));
            // });

            services.AddMvc (options => {
                    var policy = new AuthorizationPolicyBuilder ()
                        .RequireAuthenticatedUser ()
                        .Build ();
                    options.Filters.Add (new AuthorizeFilter (policy));
                })
                .SetCompatibilityVersion (CompatibilityVersion.Version_2_2)
                .AddJsonOptions (opt => {
                    opt.SerializerSettings.ReferenceLoopHandling =
                        Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                });
            services.AddCors ();

            services.AddAutoMapper (typeof (AuthRepository).Assembly);
            //services.AddAutoMapper (typeof (LookupRepository).Assembly);
            services.AddTransient<Seed> ();
            services.AddScoped<IAuthRepository, AuthRepository> ();
            services.AddScoped<ILookupRepository, LookupRepository> ();
            services.AddScoped<IProjectTrackingRepository, ProjectTrackingRepository> ();
            // services.AddScoped<LogUserActivity>();
            services.AddOData ();

            //this configuration removes the maxsize upload error
            services.Configure<FormOptions> (o => {
                o.ValueLengthLimit = int.MaxValue;
                o.MultipartBodyLengthLimit = int.MaxValue;
                o.MemoryBufferThreshold = int.MaxValue;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IHostingEnvironment env) {
            if (env.IsDevelopment ()) {
                app.UseDeveloperExceptionPage ();
            } else {
                app.UseExceptionHandler (builder => {
                    builder.Run (async context => {
                        context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

                        var error = context.Features.Get<IExceptionHandlerFeature> ();
                        if (error != null) {
                            context.Response.AddApplicationError (error.Error.Message);
                            await context.Response.WriteAsync (error.Error.Message);
                        }
                    });
                });
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                // app.UseHsts();
            }

            // app.UseHttpsRedirection();
            app.UseCors (x => x.AllowAnyOrigin ().AllowAnyHeader ().AllowAnyMethod ());
            app.UseAuthentication ();
            app.UseDefaultFiles ();
            app.UseStaticFiles ();
            app.UseStaticFiles (new StaticFileOptions () {
                FileProvider = new PhysicalFileProvider (Path.Combine (Directory.GetCurrentDirectory (), @"Resources")),
                    RequestPath = new PathString ("/Resources")
            });
            app.UseMvc (routes => {
                routes.MapSpaFallbackRoute (
                    name: "spa-fallback",
                    defaults : new { controller = "Fallback", action = "Index" }
                );
                routes.EnableDependencyInjection ();
                routes.Expand ().Select ().Filter ().Count ().OrderBy ();
            });
        }
    }
}