using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectTrackingSystem.API.Data;
using ProjectTrackingSystem.API.Dtos;
using ProjectTrackingSystem.API.Models;
namespace ProjectTrackingSystem.API.Controllers {
    [Route ("api/[controller]")]
    [ApiController]

    public class WBSController : ControllerBase {
        private readonly IMapper _mapper;
        private IProjectTrackingRepository _repo;

        public WBSController (IProjectTrackingRepository repo, IMapper mapper) {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet ("GetWBSes/{Id}")]
        public async Task<IActionResult> GetWBSes (int Id) {
            var projectFromRepo = await _repo.GetWBSes (Id);

            if (projectFromRepo.Count == 0) {
                return NotFound ();
            }

            return Ok (projectFromRepo);

        }

        [HttpPost ("AddWBS")]
        public async Task<IActionResult> AddWBS (WBSForAddDto wbsForAddDto) {
            var WBS = _mapper.Map<WBS> (wbsForAddDto);
            _repo.Add (WBS);
            if (await _repo.SaveAll ())
                return NoContent ();
            throw new Exception ("Adding WBS failed on save");

        }

        [HttpPost ("EditWBS")]
        public async Task<IActionResult> EditWBS (WBSForAddDto wbsForAddDto) {
            var wbsFromRepo = await _repo.GetWBS (wbsForAddDto.Id);
            _mapper.Map (wbsForAddDto, wbsFromRepo);

            if (!await _repo.SaveAll ())
                throw new Exception ($"Updating failed on save");
            return NoContent ();
        }

        [HttpGet ("GetWBSForDDL/{projectId}")]
        public async Task<IActionResult> GetWBSForDDL (int projectId) {
            var WBSFromRepo = await _repo.GetWBSForDDL (projectId);
            if (WBSFromRepo.Count == 0) {
                return NotFound ();
            }
            return Ok (WBSFromRepo);

        }
    }
}