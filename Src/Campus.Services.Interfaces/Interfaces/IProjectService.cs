using System.Collections.Generic;
using System.Threading.Tasks;
using Campus.Services.Interfaces.DTO.Project;

namespace Campus.Services.Interfaces.Interfaces
{
    public interface IProjectService
    {
        Task<IEnumerable<ProjectModelDto>> GetSavedProjects(int userId, int offset, int limit);
    }
}