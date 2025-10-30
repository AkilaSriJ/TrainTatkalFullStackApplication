using Genx.TrainTatkalBooking.Service.Interface;
using Genx.TrainTatkalBooking.Service.Service;

namespace Genx.TrainTatkalBooking.Api.DependencyInjection
{
    public static class ServiceDI
    {
        public static IServiceCollection AddServiceDI(this IServiceCollection services)
        {
            services.AddScoped<ITrainService, TrainService>();
            services.AddScoped<ICoachService, CoachService>();
            services.AddScoped<IPassengerService, PassengerService>();
            services.AddScoped<IBookingService, BookingService>();
            return services;
        }
    }
}
