using Genx.TrainTatkalBooking.Data.Interface;
using Genx.TrainTatkalBooking.Data.Repository;

namespace Genx.TrainTatkalBooking.Api.DependencyInjection
{
    public static class DataDI
    {
        public static IServiceCollection AddDataDI(this IServiceCollection services)
        {
            services.AddScoped<ITrainRepository, TrainRepository>();
            services.AddScoped<ICoachRepository, CoachRepository>();
            services.AddScoped<IPassengerRepository, PassengerRepository>();
            services.AddScoped<IBookingDetails, BookingDetailsRepository>();
            return services;
        }

    }
}
