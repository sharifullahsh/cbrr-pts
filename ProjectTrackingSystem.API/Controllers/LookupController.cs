using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectTrackingSystem.API.Data;
using ProjectTrackingSystem.API.Dtos;
using ProjectTrackingSystem.API.Models;

namespace ProjectTrackingSystem.API.Controllers {
    [Route ("api/[controller]")]
    [ApiController]

    public class LookupController : ControllerBase {

        private readonly IMapper _mapper;
        private ILookupRepository _repo;

        public LookupController (ILookupRepository repo, IMapper mapper) {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet ("GetProgrammes")]
        public async Task<IActionResult> GetProgrammes () {
            var programmesFromRepo = await _repo.GetProgrammes ();

            var programmes = _mapper.Map<List<ProgrammeForDropdownDto>> (programmesFromRepo);

            return Ok (programmes);

        }

        [HttpGet ("GetCurrencies")]
        public async Task<IActionResult> GetCurrencies () {
            var CurrenciesFromRepo = await _repo.GetCurrencies ();

            var Currencies = _mapper.Map<List<CurrencyForDropdownDto>> (CurrenciesFromRepo);

            return Ok (Currencies);

        }

        [HttpGet ("GetTransTypes")]
        public async Task<IActionResult> GetTransTypes () {
            var TransTypesFromRepo = await _repo.GetTransType ();

            var transTypes = _mapper.Map<List<TransTypeForDropdownDto>> (TransTypesFromRepo);

            return Ok (transTypes);

        }

        [HttpGet ("GetProvinces")]
        public async Task<IActionResult> GetProvinces () {
            var ProvinceFromRepo = await _repo.GetProvinces ();

            var provinces = _mapper.Map<List<ProvinceForDropdownDto>> (ProvinceFromRepo);

            return Ok (provinces);

        }

        [HttpGet ("GetDepartments")]
        [EnableQuery]
        public async Task<IActionResult> GetDepartments () {
            var DeparmentFromRepo = await _repo.GetDepartments ();

            var departments = _mapper.Map<List<DepartmentForDropdownDto>> (DeparmentFromRepo);

            return Ok (departments);

        }

        [HttpGet ("GetEventTypes")]
        public async Task<IActionResult> GetEventTypes () {
            var EventTypesFromRepo = await _repo.GetEventTypes ();

            var eventTypes = _mapper.Map<List<EventTypeForDropdownDto>> (EventTypesFromRepo);

            return Ok (eventTypes);

        }

        [HttpGet ("GetResponsibles")]
        public async Task<IActionResult> GetResponsibles () {
            var responsibleFromRepo = await _repo.GetResponsiles ();

            var responsible = _mapper.Map<List<ResponsibleForDropdownDto>> (responsibleFromRepo);

            return Ok (responsible);

        }
         [HttpGet ("GetEventStatuses")]
        public async Task<IActionResult> GetEventStatuses () {
            var eventStatusFromRepo = await _repo.GetEventStatuses ();

            var eventStatus = _mapper.Map<List<EventStatusForDropdownDto>> (eventStatusFromRepo);

            return Ok (eventStatus);

        }

    }
}