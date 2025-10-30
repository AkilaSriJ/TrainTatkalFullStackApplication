using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Genx.TrainTatkalBooking.Data.Model;

namespace Genx.TrainTatkalBooking.Data.Context
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Train> Trains { get; set; }
        public DbSet<Coach> Coaches { get; set; }
        public DbSet<Passenger> Passengers { get; set; }
        public DbSet<BookingDetail> BookingDetails { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<BookingDetail>()
                 .HasKey(b => b.BookingId);
            modelBuilder.Entity<Coach>()
                .HasOne(c => c.Train)
                .WithMany(t => t.Coaches)
                .HasForeignKey(c => c.TrainId);

            modelBuilder.Entity<Passenger>()
                .HasOne(p => p.Coach)
                .WithMany(c=>c.Passengers)
                .HasForeignKey(p => p.CoachId);

            modelBuilder.Entity<BookingDetail>()
                .HasOne(b => b.Train)
                .WithMany(t => t.BookingDetails)
                .HasForeignKey(b => b.TrainId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<BookingDetail>()
                .HasOne(b => b.Coach)
                .WithMany(c => c.BookingDetails)
                .HasForeignKey(b => b.CoachId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<BookingDetail>()
                .HasOne(b => b.Passenger)
                .WithOne(p => p.BookingDetails)
                .HasForeignKey<BookingDetail>(b => b.PassengerId);
        }

    }
}
