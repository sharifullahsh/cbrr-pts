using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectTrackingSystem.API.Migrations
{
    public partial class add_Remarks_transactionevent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Remarks",
                table: "TransactionEvents",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Remarks",
                table: "TransactionEvents");
        }
    }
}
