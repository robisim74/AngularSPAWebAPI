using AngularSPAWebAPI.Data;
using System.Threading.Tasks;

namespace AngularSPAWebAPI.Services
{
    public interface IDbInitializer
    {
        Task Initialize(ApplicationDbContext context);
    }
}
