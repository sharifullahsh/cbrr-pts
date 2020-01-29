using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectTrackingSystem.API.Migrations
{
    public partial class transEventDocRemove : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TransactionEvents_TransactionEventTypes_TransactionEventTypeId",
                table: "TransactionEvents");

            migrationBuilder.DropTable(
                name: "TransactionDocuments");

            migrationBuilder.AlterColumn<int>(
                name: "TransactionEventTypeId",
                table: "TransactionEvents",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "URL",
                table: "TransactionEvents",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_TransactionEvents_TransactionEventTypes_TransactionEventTypeId",
                table: "TransactionEvents",
                column: "TransactionEventTypeId",
                principalTable: "TransactionEventTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TransactionEvents_TransactionEventTypes_TransactionEventTypeId",
                table: "TransactionEvents");

            migrationBuilder.DropColumn(
                name: "URL",
                table: "TransactionEvents");

            migrationBuilder.AlterColumn<int>(
                name: "TransactionEventTypeId",
                table: "TransactionEvents",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateTable(
                name: "TransactionDocuments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DocumentName = table.Column<string>(nullable: true),
                    TransactionEventId = table.Column<int>(nullable: false),
                    Url = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransactionDocuments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TransactionDocuments_TransactionEvents_TransactionEventId",
                        column: x => x.TransactionEventId,
                        principalTable: "TransactionEvents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TransactionDocuments_TransactionEventId",
                table: "TransactionDocuments",
                column: "TransactionEventId");

            migrationBuilder.AddForeignKey(
                name: "FK_TransactionEvents_TransactionEventTypes_TransactionEventTypeId",
                table: "TransactionEvents",
                column: "TransactionEventTypeId",
                principalTable: "TransactionEventTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
