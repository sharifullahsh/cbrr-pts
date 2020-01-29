using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProjectTrackingSystem.API.Models;

namespace ProjectTrackingSystem.API.Data
{
    public class DataContext:IdentityDbContext<User, Role, int, 
        IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, 
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options):base (options)
        {
            
        }
         public DbSet<Project> Projects { get; set; }
         public DbSet<ProjectDocument> ProjectDocuments { get; set; }
         public DbSet<Programme> Programmes { get; set; }
         public DbSet<Currency> Currencies { get; set; }
         public DbSet<DocumentType> DocumentTypes { get; set; }
         public DbSet<WBS> WBS { get; set; }
         public DbSet<Unit> Units { get; set; }

         public DbSet<ProjectTransaction> ProjectTransactions { get; set; }
         public DbSet<TransactionType> TransactionTypes { get; set; }
         public DbSet<Department> Departments { get; set; }
         public DbSet<TransactionEvent> TransactionEvents { get; set; }
         public DbSet<TransactionEventType> TransactionEventTypes { get; set; }
         public DbSet<Province> Provinces { get; set; }
         //public DbSet<TransactionDocument> TransactionDocuments { get; set; }
         public DbSet<EventStatus> EventStatus { get; set; }  

         public DbSet<Responsible> Responsible {get;set;}


         protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
             builder.Entity<UserRole>(userRole => 
            {
                userRole.HasKey(ur => new {ur.UserId, ur.RoleId});

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });
            builder.Entity<Project>()
                .HasOne(u => u.Currency)
                .WithMany(m => m.Projects)                
                .OnDelete(DeleteBehavior.Restrict);

                
            builder.Entity<Project>()
                .HasOne(p => p.Programme)
                .WithMany(m => m.Projects)                
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<WBS>()
            .Property(m=>m.UnitId)
            .IsRequired(false);              
                
        }
    }
}