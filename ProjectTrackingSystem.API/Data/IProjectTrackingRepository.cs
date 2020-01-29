using System.Collections.Generic;
using System.Threading.Tasks;
using ProjectTrackingSystem.API.Dtos;
using ProjectTrackingSystem.API.Helpers;
using ProjectTrackingSystem.API.Models;

namespace ProjectTrackingSystem.API.Data {
    public interface IProjectTrackingRepository {
        void Add<T> (T entity) where T : class;
        void Delete<T> (T entity) where T : class;
        Task<bool> SaveAll ();
        Task<List<ProjectForListReturn>> GetProjects ();
        Task<Project> GetProject (int Id);
        Task<List<ProjectForDDLDto>> GetProjectsByProgramme (int ProgrammeId);
        Task<List<WBSForListDto>> GetWBSes (int ProjectId);
        Task<WBS> GetWBS (int Id);
        Task<List<WBSForDDLDto>> GetWBSForDDL (int projectId);
        Task<PagedList<TransactionsForListDto>> GetTransactions (TransParams transParams);
        Task<ProjectTransaction> GetTransaction (int Id);
        Task<List<TransEventsForListDto>> GetTransactionEvents (int TransId);
         Task<TransactionEvent> GetTransactionEvent (int Id);
        

    }
}