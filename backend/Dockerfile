# backend/Dockerfile
# Build stage with .NET SDK
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy everything (solution + projects)
COPY . .

# Restore NuGet packages for the solution (adjust path if your .sln is at a different path)
RUN dotnet restore Genx.TrainTatkalBooking.sln


# Publish the Service project (adjust project path if needed)
RUN dotnet publish Genx.TrainTatkalBooking.Service/Genx.TrainTatkalBooking.Service.csproj -c Release -o /app/publish /p:UseAppHost=false


# Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
ENV ASPNETCORE_URLS=http://+:8080

# Copy published output
COPY --from=build /app/publish .

# Expose port that the app listens on
EXPOSE 8080

ENTRYPOINT ["dotnet", "Genx.TrainTatkalBooking.Service.dll"]
