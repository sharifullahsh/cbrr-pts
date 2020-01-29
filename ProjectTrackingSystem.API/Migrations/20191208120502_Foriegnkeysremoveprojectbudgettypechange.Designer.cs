﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ProjectTrackingSystem.API.Data;

namespace ProjectTrackingSystem.API.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20191208120502_Foriegnkeysremoveprojectbudgettypechange")]
    partial class Foriegnkeysremoveprojectbudgettypechange
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.1-servicing-10028")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<int>("RoleId");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<int>("UserId");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("ProjectTrackingSystem.API.Models.Currency", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CurrencyName");

                    b.HasKey("Id");

                    b.ToTable("Currencies");
                });

            modelBuilder.Entity("ProjectTrackingSystem.API.Models.Department", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("DepartmentName");

                    b.HasKey("Id");

                    b.ToTable("Departments");
                });

            modelBuilder.Entity("ProjectTrackingSystem.API.Models.DocumentType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("DocumentTypeName");

                    b.HasKey("Id");

                    b.ToTable("DocumentTypes");
                });

            modelBuilder.Entity("ProjectTrackingSystem.API.Models.Programme", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ProgrammeName");

                    b.HasKey("Id");

                    b.ToTable("Programmes");
                });

            modelBuilder.Entity("ProjectTrackingSystem.API.Models.Project", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Budget");

                    b.Property<int>("CurrencyId");

                    b.Property<DateTime>("EndDate");

                    b.Property<bool>("IsDeleted");

                    b.Property<int>("ProgrammeId");

                    b.Property<string>("ProjectCode");

                    b.Property<string>("ProjectName");

                    b.Property<DateTime>("StartDate");

                    b.HasKey("Id");

                    b.HasIndex("CurrencyId");

                    b.HasIndex("ProgrammeId");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("ProjectTrackingSystem.API.Models.ProjectDocument", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("DocumentName");

                    b.Property<int>("DocumentTypeId");

                    b.Property<int>("ProjectId");

                    b.Property<string>("Url");

                    b.HasKey("Id");

                    b.HasIndex("DocumentTypeId");

                    b.HasIndex("ProjectId");

                    b.ToTable("ProjectDocuments");
                });

            modelBuilder.Entity("ProjectTrackingSystem.API.Models.ProjectTransaction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<float>("Amount");

                    b.Property<int>("CurrencyId");

                    b.Property<float>("ExchangeRate");

                    b.Property<bool>("IsDeleted");

                    b.Property<int>("ProvinceId");

                    b.Property<DateTime>("TransactionDate");

                    b.Property<int>("TransactionTypeId");

                    b.Property<int>("WBSId");

                    b.HasKey("Id");

                    b.HasIndex("CurrencyId");

                    b.HasIndex("ProvinceId");

                    b.HasIndex("TransactionTypeId");

                    b.HasIndex("WBSId");

                    b.ToTable("ProjectTransactions");
                });

            modelBuilder.Entity("ProjectTrackingSystem.API.Models.Province", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ProvinceName");

                    b.HasKey("Id");

                    b.ToTable("Provinces");
                });

            modelBuilder.Entity("ProjectTrackingSystem.API.Models.Responsible", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ResponsibleName");

                    b.HasKey("Id");

                    b.ToTable("Responsible");
                });

            modelBuilder.Entity("ProjectTrackingSystem.API.Models.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("ProjectTrackingSystem.API.Models.TransactionDocument", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("DocumentName");

                    b.Property<int>("TransactionEventId");

                    b.Property<string>("Url");

                    b.HasKey("Id");

                    b.HasIndex("TransactionEventId");

                    b.ToTable("TransactionDocuments");
                });

            modelBuilder.Entity("ProjectTrackingSystem.API.Models.TransactionEvent", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("DepartmentId");

                    b.Property<DateTime>("EventDate");

                    b.Property<int>("EventTypeId");

                    b.Property<bool>("IsDeleted");

                    b.Property<int?>("ProjectTransactionId");

                    b.Property<int>("ResponsibleId");

                    b.Property<int?>("TransactionEventTypeId");

                    b.HasKey("Id");

                    b.HasIndex("DepartmentId");

                    b.HasIndex("ProjectTransactionId");

                    b.HasIndex("ResponsibleId");

                    b.HasIndex("TransactionEventTypeId");

                    b.ToTable("TransactionEvents");
                });

            modelBuilder.Entity("ProjectTrackingSystem.API.Models.TransactionEventType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("EventTypeName");

                    b.HasKey("Id");

                    b.ToTable("TransactionEventTypes");
                });

            modelBuilder.Entity("ProjectTrackingSystem.API.Models.TransactionType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("TransactionTypeName");

                    b.HasKey("Id");

                    b.ToTable("TransactionTypes");
                });

            modelBuilder.Entity("ProjectTrackingSystem.API.Models.Unit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("UnitName");

                    b.HasKey("Id");

                    b.ToTable("Units");
                });

            modelBuilder.Entity("ProjectTrackingSystem.API.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<DateTime>("Created");

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<DateTime>("LastActive");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<int>("ProgramId");

                    b.Property<int>("ProvinceId");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("ProjectTrackingSystem.API.Models.UserRole", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<int>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("ProjectTrackingSystem.API.Models.WBS", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<float>("Budget");

                    b.Property<string>("Description");

                    b.Property<int>("ProjectId");

                    b.Property<float>("Target");

                    b.Property<float>("UnitCost");

                    b.Property<int>("UnitId");

                    b.Property<int>("WBSId");

                    b.Property<string>("WBSName");

                    b.HasKey("Id");

                    b.HasIndex("ProjectId");

                    b.HasIndex("UnitId");

                    b.ToTable("WBS");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.HasOne("ProjectTrackingSystem.API.Models.Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.HasOne("ProjectTrackingSystem.API.Models.User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.HasOne("ProjectTrackingSystem.API.Models.User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.HasOne("ProjectTrackingSystem.API.Models.User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ProjectTrackingSystem.API.Models.Project", b =>
                {
                    b.HasOne("ProjectTrackingSystem.API.Models.Currency", "Currency")
                        .WithMany("Projects")
                        .HasForeignKey("CurrencyId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("ProjectTrackingSystem.API.Models.Programme", "Programme")
                        .WithMany("Projects")
                        .HasForeignKey("ProgrammeId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("ProjectTrackingSystem.API.Models.ProjectDocument", b =>
                {
                    b.HasOne("ProjectTrackingSystem.API.Models.DocumentType", "DocumentType")
                        .WithMany("ProjectDocuments")
                        .HasForeignKey("DocumentTypeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ProjectTrackingSystem.API.Models.Project", "Project")
                        .WithMany("ProjectDocuments")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ProjectTrackingSystem.API.Models.ProjectTransaction", b =>
                {
                    b.HasOne("ProjectTrackingSystem.API.Models.Currency", "Currency")
                        .WithMany()
                        .HasForeignKey("CurrencyId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ProjectTrackingSystem.API.Models.Province", "Province")
                        .WithMany("ProjectTransactions")
                        .HasForeignKey("ProvinceId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ProjectTrackingSystem.API.Models.TransactionType")
                        .WithMany("BusinessTransactions")
                        .HasForeignKey("TransactionTypeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ProjectTrackingSystem.API.Models.WBS", "WBS")
                        .WithMany("ProjectTransactions")
                        .HasForeignKey("WBSId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ProjectTrackingSystem.API.Models.TransactionDocument", b =>
                {
                    b.HasOne("ProjectTrackingSystem.API.Models.TransactionEvent", "TransactionEvent")
                        .WithMany("TransactionDocuments")
                        .HasForeignKey("TransactionEventId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ProjectTrackingSystem.API.Models.TransactionEvent", b =>
                {
                    b.HasOne("ProjectTrackingSystem.API.Models.Department", "Department")
                        .WithMany("TransactionEvents")
                        .HasForeignKey("DepartmentId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ProjectTrackingSystem.API.Models.ProjectTransaction")
                        .WithMany("TransactionEvents")
                        .HasForeignKey("ProjectTransactionId");

                    b.HasOne("ProjectTrackingSystem.API.Models.Responsible", "Responsible")
                        .WithMany("TransactionEvents")
                        .HasForeignKey("ResponsibleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ProjectTrackingSystem.API.Models.TransactionEventType", "TransactionEventType")
                        .WithMany("TransactionEvents")
                        .HasForeignKey("TransactionEventTypeId");
                });

            modelBuilder.Entity("ProjectTrackingSystem.API.Models.UserRole", b =>
                {
                    b.HasOne("ProjectTrackingSystem.API.Models.Role", "Role")
                        .WithMany("UserRoles")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ProjectTrackingSystem.API.Models.User", "User")
                        .WithMany("UserRoles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ProjectTrackingSystem.API.Models.WBS", b =>
                {
                    b.HasOne("ProjectTrackingSystem.API.Models.Project", "Project")
                        .WithMany("WBS")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ProjectTrackingSystem.API.Models.Unit", "Unit")
                        .WithMany("WBS")
                        .HasForeignKey("UnitId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
