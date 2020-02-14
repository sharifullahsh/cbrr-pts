using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectTrackingSystem.API.Data;
using ProjectTrackingSystem.API.Dtos;
using ProjectTrackingSystem.API.Helpers;
using ProjectTrackingSystem.API.Models;

namespace ProjectTrackingSystem.API.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class ProjectTransactionController : ControllerBase {
        private readonly IMapper _mapper;
        private IProjectTrackingRepository _repo;

        public ProjectTransactionController (IProjectTrackingRepository repo, IMapper mapper) {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet ("GetTransactions/{wbsId}")]
        public async Task<IActionResult> GetTransactions (int wbsId, [FromQuery] TransParams transParams) {
            transParams.WBSId = wbsId;
            var TransactionsFromRepo = await _repo.GetTransactions (transParams);

            Response.AddPagination (TransactionsFromRepo.CurrentPage, TransactionsFromRepo.PageSize,
                TransactionsFromRepo.TotalCount, TransactionsFromRepo.TotalPages);

            return Ok (TransactionsFromRepo);

        }

        [HttpPost ("AddTransaction")]
        public async Task<IActionResult> AddTransaction (TransactionForAddDto transactionForAddDto) {
            var transaction = _mapper.Map<ProjectTransaction> (transactionForAddDto);
            _repo.Add (transaction);
            if (await _repo.SaveAll ())
                return NoContent ();
            throw new Exception ("Adding Transaction failed on save");

        }

        [HttpPost ("EditTransaction")]
        public async Task<IActionResult> EditTransaction (TransactionForAddDto transactionForAddDto) {
            var transaction = await _repo.GetTransaction (transactionForAddDto.Id);
            _mapper.Map (transactionForAddDto, transaction);

            if (!await _repo.SaveAll ())
                throw new Exception ($"Updating failed on save");
            return NoContent ();
        }

        [HttpGet ("GetProjectTransactionEvents/{transId}")]
        public async Task<IActionResult> GetProjectTransactionEvents (int transId) {
            var TransEventsFromRepo = await _repo.GetTransactionEvents (transId);
            return Ok (TransEventsFromRepo);

        }

          [HttpPost ("AddTransactionEvent")]
        public async Task<IActionResult> AddTransactionEvent (TransEventsForAddDto transEventForAddDto) {
            
            var transactionEvent = _mapper.Map<TransactionEvent> (transEventForAddDto);
            _repo.Add (transactionEvent);
            if (await _repo.SaveAll ())
                return NoContent ();
            throw new Exception ("Adding Transaction Event failed on save");

        }
          [HttpPost ("EditTransactionEvent")]
        public async Task<IActionResult> EditTransactionEvent (TransEventsForAddDto transEventsForAddDto) {
            var transEvent = await _repo.GetTransactionEvent (transEventsForAddDto.Id);
            _mapper.Map (transEventsForAddDto, transEvent);

            if (!await _repo.SaveAll ())
                throw new Exception ($"Updating failed on save");
            return NoContent ();
        }
        [HttpPost ("RemoveTransaction/{id}")]
        public async Task<IActionResult> RemoveTransaction (int Id) {

            var transFromRepo = await _repo.GetTransaction (Id);
            if (transFromRepo == null) {
                return NotFound ("Transaction Not Found");
            }
            transFromRepo.IsDeleted = true;
            if (!await _repo.SaveAll ())
                throw new Exception ($"Deleting failed!");
            return Ok ();
        }
        [HttpPost ("RemoveTransactionEven/{id}")]
        public async Task<IActionResult> RemoveTransactionEven (int Id) {

            var transEventFromRepo = await _repo.GetTransactionEvent (Id);
            if (transEventFromRepo == null) {
                return NotFound ("Transaction event Not Found");
            }
            transEventFromRepo.IsDeleted = true;
            if (!await _repo.SaveAll ())
                throw new Exception ($"Deleting failed!");
            return Ok ();
        }
    }
}