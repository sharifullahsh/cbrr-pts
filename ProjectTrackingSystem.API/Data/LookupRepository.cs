using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProjectTrackingSystem.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ProjectTrackingSystem.API.Data
{
    public class LookupRepository : ILookupRepository
    {
         private readonly DataContext _context;

        public LookupRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            throw new System.NotImplementedException();
        }

        public void Delete<T>(T entity) where T : class
        {
            throw new System.NotImplementedException();
        }

        public Task<List<Currency>> GetCurrencies()
        {
             return _context.Currencies.ToListAsync();
        }

        public Task<List<Department>> GetDepartments()
        {
            return _context.Departments.ToListAsync();
        }

        public Task<List<EventStatus>> GetEventStatuses()
        {
           return _context.EventStatus.ToListAsync();
        }

        public Task<List<TransactionEventType>> GetEventTypes()
        {
           return _context.TransactionEventTypes.ToListAsync();
        }

        public Task<List<Programme>> GetProgrammes()
        {
          return _context.Programmes.ToListAsync();
                
        }

        public Task<List<Province>> GetProvinces()
        {
           return _context.Provinces.ToListAsync();
        }

        public Task<List<Responsible>> GetResponsiles()
        {
           return _context.Responsible.ToListAsync();
        }

        public Task<bool> SaveAll()
        {
            throw new System.NotImplementedException();
        }
        Task<List<TransactionType>> ILookupRepository.GetTransType()
        {
           return _context.TransactionTypes.ToListAsync();
        }
    }
}