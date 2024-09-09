FROM mcr.microsoft.com/dotnet/sdk:6.0 as build

WORKDIR /app
COPY . .

RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/runtime:6.0 as runtime

WORKDIR /app/
COPY --from=build /app/out .
COPY data data

ENTRYPOINT ["./runner"]