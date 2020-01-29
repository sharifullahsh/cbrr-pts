using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectTrackingSystem.API.Migrations
{
    public partial class transEvent_fk : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TransactionEvents_ProjectTransactions_ProjectTransactionId",
                table: "TransactionEvents");

            migrationBuilder.AlterColumn<int>(
                name: "ProjectTransactionId",
                table: "TransactionEvents",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_TransactionEvents_ProjectTransactions_ProjectTransactionId",
                table: "TransactionEvents",
                column: "ProjectTransactionId",
                principalTable: "ProjectTransactions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TransactionEvents_ProjectTransactions_ProjectTransactionId",
                table: "TransactionEvents");

            migrationBuilder.AlterColumn<int>(
                name: "ProjectTransactionId",
                table: "TransactionEvents",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_TransactionEvents_ProjectTransactions_ProjectTransactionId",
                table: "TransactionEvents",
                column: "ProjectTransactionId",
                principalTable: "ProjectTransactions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
