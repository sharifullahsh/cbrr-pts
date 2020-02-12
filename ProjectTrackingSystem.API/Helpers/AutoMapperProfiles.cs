using System.Linq;
using AutoMapper;
using ProjectTrackingSystem.API.Dtos;
using ProjectTrackingSystem.API.Models;
namespace ProjectTrackingSystem.API.Helpers {
    public class AutoMapperProfiles : Profile {
        public AutoMapperProfiles () {
            CreateMap<User, UserForDetailedDto> ();
            CreateMap<User, UserForListDto> ();
            CreateMap<UserForRegisterDto, User> ();
            CreateMap<UserForEditRegisterDto, User> ();
            CreateMap<Programme, ProgrammeForDropdownDto> ();
            CreateMap<Currency, CurrencyForDropdownDto> ();
            CreateMap<TransactionType, TransTypeForDropdownDto> ();
            CreateMap<Province, ProvinceForDropdownDto> ();
            CreateMap<ProjectForAddDto, Project> ();
            CreateMap<Project, ProjectForListReturn> ();
            CreateMap<WBSForAddDto, WBS> ();
            CreateMap<TransactionForAddDto, ProjectTransaction> ();
            CreateMap<Department, DepartmentForDropdownDto> ();
            CreateMap<TransactionEventType, EventTypeForDropdownDto> ();
            CreateMap<EventStatus, EventStatusForDropdownDto> ();
            CreateMap<Responsible, ResponsibleForDropdownDto> ();
            CreateMap<TransEventsForAddDto, TransactionEvent> ();

        }
    }
}