# Use the official .NET 8 SDK image to build the project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the solution file and restore dependencies
COPY Genx.TrainTatkalBooking.sln ./
COPY Genx.TrainTatkalBooking.Api/Genx.TrainTatkalBooking.Api.csproj Genx.TrainTatkalBooking.Api/
COPY Genx.TrainTatkalBooking.Data/Genx.TrainTatkalBooking.Data.csproj Genx.TrainTatkalBooking.Data/
COPY Genx.TrainTatkalBooking.Model/Genx.TrainTatkalBooking.Model.csproj Genx.TrainTatkalBooking.Model/
COPY Genx.TrainTatkalBooking.Service/Genx.TrainTatkalBooking.Service.csproj Genx.TrainTatkalBooking.Service/
COPY Genx.TrainTatkalBooking.Common/Genx.TrainTatkalBooking.Common.csproj Genx.TrainTatkalBooking.Common/

RUN dotnet restore Genx.TrainTatkalBooking.sln

# Copy the entire project files
COPY . .

# Build the API project
WORKDIR /src/Genx.TrainTatkalBooking.Api
RUN dotnet publish -c Release -o /app/publish

# Use a smaller runtime image for production
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Expose the default port
EXPOSE 8080
EXPOSE 8081

# Set the entry point
ENTRYPOINT ["dotnet", "Genx.TrainTatkalBooking.Api.dll"]
