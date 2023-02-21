﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApplication1.Migrations
{
    /// <inheritdoc />
    public partial class CodeExpire : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "row",
                table: "Albumns",
                newName: "Row");

            migrationBuilder.RenameColumn(
                name: "column",
                table: "Albumns",
                newName: "Column");

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CodeExpries",
                table: "Accounts",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "CodeExpries",
                table: "Accounts");

            migrationBuilder.RenameColumn(
                name: "Row",
                table: "Albumns",
                newName: "row");

            migrationBuilder.RenameColumn(
                name: "Column",
                table: "Albumns",
                newName: "column");
        }
    }
}
