using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectTrackingSystem.API.Migrations
{
    public partial class ForiegnkeysremoveprojectForiegnKeys : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Currencies_CurrencyId",
                table: "Projects");

            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Programmes_ProgrammeId",
                table: "Projects");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Currencies_CurrencyId",
                table: "Projects",
                column: "CurrencyId",
                principalTable: "Currencies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Programmes_ProgrammeId",
                table: "Projects",
                column: "ProgrammeId",
                principalTable: "Programmes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Currencies_CurrencyId",
                table: "Projects");

            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Programmes_ProgrammeId",
                table: "Projects");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Currencies_CurrencyId",
                table: "Projects",
                column: "CurrencyId",
                principalTable: "Currencies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Programmes_ProgrammeId",
                table: "Projects",
                column: "ProgrammeId",
                principalTable: "Programmes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
