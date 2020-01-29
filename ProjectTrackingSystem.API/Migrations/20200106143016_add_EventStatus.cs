using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectTrackingSystem.API.Migrations
{
    public partial class add_EventStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EventStatusId",
                table: "TransactionEvents",
                nullable: true,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "EventStatus",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    EventStatusName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventStatus", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TransactionEvents_EventStatusId",
                table: "TransactionEvents",
                column: "EventStatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_TransactionEvents_EventStatus_EventStatusId",
                table: "TransactionEvents",
                column: "EventStatusId",
                principalTable: "EventStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TransactionEvents_EventStatus_EventStatusId",
                table: "TransactionEvents");

            migrationBuilder.DropTable(
                name: "EventStatus");

            migrationBuilder.DropIndex(
                name: "IX_TransactionEvents_EventStatusId",
                table: "TransactionEvents");

            migrationBuilder.DropColumn(
                name: "EventStatusId",
                table: "TransactionEvents");
        }
    }
}
