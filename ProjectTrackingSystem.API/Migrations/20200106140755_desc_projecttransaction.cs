using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectTrackingSystem.API.Migrations
{
    public partial class desc_projecttransaction : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "ProjectTransactions",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "ProjectTransactions");
        }
    }
}
