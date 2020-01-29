using System.Collections.Generic;
using System.Threading.Tasks;
using ProjectTrackingSystem.API.Helpers;
using ProjectTrackingSystem.API.Models;

namespace ProjectTrackingSystem.API.Data
{
    public interface ILookupRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<List<Programme>> GetProgrammes();       
         Task<List<Currency>> GetCurrencies(); 
         Task<List<TransactionType>> GetTransType(); 
         Task<List<Province>> GetProvinces(); 
         Task<List<Department>> GetDepartments();          
         Task<List<EventStatus>> GetEventStatuses();          
         Task<List<TransactionEventType>> GetEventTypes(); 
         Task<List<Responsible>> GetResponsiles ();
         
    }
}