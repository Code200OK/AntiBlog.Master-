using System;
using System.Threading.Tasks;
using Campus.Infrastructure.Data.EntityFrameworkCore.Context;
using Campus.Master.API.Helpers.Contracts;
using Campus.Master.IntegrationTests.Utils;
using Campus.Services.Interfaces.DTO.Profile;
using Campus.Services.Interfaces.Interfaces;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Xunit;
using Controller =  Campus.Master.API.Controllers.ProfileController;

namespace Campus.Master.IntegrationTests.ProfileController
{
    public class AuthenticateProfileTests : IDisposable
    {
        private Controller Sut { get; }
        private IHttpContextAccessor Accessor { get; }
        private CampusContext Context { get; }
        
        public AuthenticateProfileTests()
        {
            var serviceProvider = ServiceCollectionBuilder.BuildCollection();
            var accessor = ContextAccessorBuilder.Build("1", "1");
            var profile = ServiceLocator.Get<IProfileService>(serviceProvider);
            var token = ServiceLocator.Get<ITokenBuilder>(serviceProvider);
            var context = ServiceLocator.Get<CampusContext>(serviceProvider);

            context.AddSampleUsers();
            Accessor = accessor;
            Context = context;
            Sut = new Controller(accessor, profile, token);
        }
        
        [Fact]
        public async Task ShouldThrowException_WhenUserWithEmailDoesNotExist()
        {
            // Arrange
            var profile = new ProfileAuthenticationDto
            {
                Email = "example@domain.com",
                Password = "password"
            };

            // Act
            Func<Task> sutCall = async () => await Sut.AuthenticateProfile(profile);

            // Assert
            await sutCall.Should().ThrowAsync<ApplicationException>()
                .WithMessage("Wrong username or password.");
        }
        
        [Fact]
        public async Task ShouldThrowException_WhenUserPasswordDoesNotMatchWithDatabase()
        {
            // Arrange
            var profile = new ProfileAuthenticationDto
            {
                Email = "example@gmail.com",
                Password = "11111111"
            };

            // Act
            Func<Task> sutCall = async () => await Sut.AuthenticateProfile(profile);

            // Assert
            await sutCall.Should().ThrowAsync<ApplicationException>()
                .WithMessage("Wrong username or password.");
        }
        
        [Fact]
        public async Task ShouldReturnStateTransfer_WhenUserPasswordMatchesWithDatabase()
        {
            // Arrange
            var profile = new ProfileAuthenticationDto
            {
                Email = "example@gmail.com",
                Password = "A1111111"
            };

            // Act
            var response = await Sut.AuthenticateProfile(profile);

            // Assert
            response.Should().NotBeNull();
        }

        public void Dispose()
        {
            Context.ClearUsers();
            Context.Dispose();
        }
    }
}
