using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProjectTrackingSystem.API.Dtos;
using ProjectTrackingSystem.API.Helpers;
using ProjectTrackingSystem.API.Models;

namespace ProjectTrackingSystem.API.Data {
    public class ProjectTrackingRepository : IProjectTrackingRepository {
        private readonly DataContext _context;
        public ProjectTrackingRepository (DataContext context) {
            _context = context;
        }
        public void Add<T> (T entity) where T : class {
            _context.Add (entity);

        }

        public void Delete<T> (T entity) where T : class {
            _context.Remove (entity);
        }
        public async Task<Project> GetProject (int Id) {
            return await _context.Projects.FirstOrDefaultAsync (x => x.Id == Id);
        }
        public async Task<List<ProjectForListReturn>> GetProjects () {
            var res = await (from project in _context.Projects where (project.IsDeleted == false) select new ProjectForListReturn {
                Id = project.Id,
                    ProjectCode = project.ProjectCode,
                    ProjectName = project.ProjectName,
                    Budget = project.Budget,
                    StartDate = project.StartDate,
                    EndDate = project.EndDate,
                    Currency = project.Currency.CurrencyName,
                    Programme = project.Programme.ProgrammeName
            }).ToListAsync ();
            return res;

        }
        public async Task<List<ProjectForDDLDto>> GetProjectsByProgramme (int ProgrammeId) {
            var res = await (from project in _context.Projects where (project.IsDeleted == false && project.ProgrammeId == ProgrammeId) select new ProjectForDDLDto {
                Id = project.Id,
                    ProjectCode = project.ProjectCode
            }).ToListAsync ();
            return res;
        }
        public async Task<List<WBSForDDLDto>> GetWBSForDDL (int projectId) {
            var res = await (from wbs in _context.WBS where (wbs.ProjectId == projectId) select new WBSForDDLDto {
                Id = wbs.Id,
                    WBSName = wbs.WBSName
            }).ToListAsync ();
            return res;
        }

        public async Task<WBS> GetWBS (int Id) {
            return await _context.WBS.FirstOrDefaultAsync (x => x.Id == Id);
        }

        public async Task<List<WBSForListDto>> GetWBSes (int ProjectId) {
            var res = await (from WBS in _context.WBS where (WBS.ProjectId == ProjectId) select new WBSForListDto {
                Id = WBS.Id,
                    WBSId = WBS.WBSId,
                    Target = WBS.Target,
                    WBSName = WBS.WBSName,
                    Budget = WBS.Budget,
                    UnitCost = WBS.UnitCost,
                    UnitId = WBS.UnitId,
                    ProjectId = WBS.ProjectId,
                    Description = WBS.Description
            }).ToListAsync ();
            return res;
        }

        public async Task<bool> SaveAll () {
            return await _context.SaveChangesAsync () > 0;
        }

        public async Task<PagedList<TransactionsForListDto>> GetTransactions (TransParams transParams) {
            var res = (from transaction in _context.ProjectTransactions where (transaction.IsDeleted == false && transaction.WBSId == transParams.WBSId) select new TransactionsForListDto {
                Id = transaction.Id,
                    TransactionTypeId = transaction.TransactionTypeId,
                    TransactionDate = transaction.TransactionDate,
                    Amount = transaction.Amount,
                    CurrencyId = transaction.CurrencyId,
                    ExchangeRate = transaction.ExchangeRate,
                    ProvinceId = transaction.ProvinceId,
                    ProvinceName = transaction.Province.ProvinceName,
                    CurrencyName = transaction.Currency.CurrencyName,
                    Description = transaction.Description,
                    WBSId = transaction.WBSId,
                    WBSName = transaction.WBS.WBSName,
                    TransactionType = transaction.TransactionType.TransactionTypeName

            });

            return await PagedList<TransactionsForListDto>.CreateAsync (res, transParams.PageNumber, transParams.PageSize);
        }

        public async Task<ProjectTransaction> GetTransaction (int Id) {
            return await _context.ProjectTransactions.FirstOrDefaultAsync (x => x.Id == Id);
        }

        public async Task<TransactionEvent> GetTransactionEvent (int Id) {
            return await _context.TransactionEvents.FirstOrDefaultAsync (x => x.Id == Id);
        }

        public async Task<List<TransEventsForListDto>> GetTransactionEvents (int TransId) {
            var res = await (from transEvent in _context.TransactionEvents where (transEvent.IsDeleted == false && transEvent.ProjectTransactionId == TransId) select new TransEventsForListDto {
                Id = transEvent.Id,
                    EventTypeId = transEvent.EventTypeId,
                    EventDate = transEvent.EventDate,
                    DepartmentId = transEvent.DepartmentId,
                    DepartmentName = transEvent.Department.DepartmentName,
                    ResponsibleId = transEvent.ResponsibleId,
                    EventStatusId = transEvent.EventStatusId,
                    EventStatusName = transEvent.EventStatus.EventStatusName,
                    EventTypeName = transEvent.TransactionEventType.EventTypeName,
                    ProjectTransactionId = transEvent.ProjectTransactionId,
                    Remarks = transEvent.Remarks,
                    ResponsibleName = transEvent.Responsible.ResponsibleName,
                    URL = transEvent.URL
            }).ToListAsync ();
            return res;
        }
    }

}