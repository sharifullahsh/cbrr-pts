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
    public class ProjectTrackingController : ControllerBase {
        private readonly IMapper _mapper;
        private IProjectTrackingRepository _repo;

        public ProjectTrackingController (IProjectTrackingRepository repo, IMapper mapper) {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpPost ("AddProject")]
        public async Task<IActionResult> AddProject (ProjectForAddDto projectForAddDto) {
            var project = _mapper.Map<Project> (projectForAddDto);
            _repo.Add (project);
            if (await _repo.SaveAll ())
                return NoContent ();
            throw new Exception ("Adding project failed on save");

        }

        [HttpGet ("GetProjects")]
        public async Task<IActionResult> GetProjects () {
            var projectFromRepo = await _repo.GetProjects ();

            // var projects = _mapper.Map<List<ProjectForListReturn>> (projectFromRepo);

            return Ok (projectFromRepo);

        }

        [HttpGet ("GetProjectsByProgramme/{programmeId}")]
        public async Task<IActionResult> GetProjectsByProgramme (int programmeId) {
            var projectFromRepo = await _repo.GetProjectsByProgramme (programmeId);
            // if (projectFromRepo.Count == 0) {
            //     return NotFound ();
            // }
            return Ok (projectFromRepo);

        }

        [HttpPost ("EditProject")]
        public async Task<IActionResult> EditProject (ProjectForAddDto projectForAddDto) {
            var projectFromRepo = await _repo.GetProject (projectForAddDto.Id);
            _mapper.Map (projectForAddDto, projectFromRepo);

            if (!await _repo.SaveAll ())
                throw new Exception ($"Updating failed on save");
            return NoContent ();
        }

        [HttpPost ("RemoveProject/{id}")]
        public async Task<IActionResult> RemoveProject (int Id) {

            var projectFromRepo = await _repo.GetProject (Id);
            if (projectFromRepo == null) {
                return NotFound ("Project Not Found");
            }
            projectFromRepo.IsDeleted = true;
            if (!await _repo.SaveAll ())
                throw new Exception ($"Deleting failed!");
            return Ok ();
        }

      

       
    }
}