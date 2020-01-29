using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using ProjectTrackingSystem.API.Data;
using ProjectTrackingSystem.API.Dtos;
using ProjectTrackingSystem.API.Helpers;
using ProjectTrackingSystem.API.Models;

namespace ProjectTrackingSystem.API.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase {

        private readonly IMapper _mapper;
        private IProjectTrackingRepository _repo;

        public UploadController (IProjectTrackingRepository repo, IMapper mapper) {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpPost, DisableRequestSizeLimit]
        public IActionResult Upload () {
            try {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine ("Resources", "Docs");
                var pathToSave = Path.Combine (Directory.GetCurrentDirectory (), folderName);

                if (file.Length > 0) {
                    var fileName = ContentDispositionHeaderValue.Parse (file.ContentDisposition).FileName.Trim ('"');
                    var fullPath = Path.Combine (pathToSave, fileName);
                   // var dbPath = Path.Combine (folderName, fileName);
                   var dbPath = fileName;

                    using (var stream = new FileStream (fullPath, FileMode.Create)) {
                        file.CopyTo (stream);
                    }

                    return Ok (new { dbPath });
                } else {
                    return BadRequest ();
                }
            } catch (Exception ex) {
                return StatusCode (500, "Internal server error");
            }
        }

        [HttpGet]
       [Route("download")]
       public async Task<IActionResult> Download([FromQuery] string file) {
           var uploads = Path.Combine ("Resources", "Docs");
           var filePath = Path.Combine(uploads, file);
           if (!System.IO.File.Exists(filePath))
               return NotFound();
 
           var memory = new MemoryStream();
           using (var stream = new FileStream(filePath, FileMode.Open))
           {
               await stream.CopyToAsync(memory);
           }
           memory.Position = 0;
 
           return File(memory, GetContentType(filePath), file);
       }
         private string GetContentType(string path)
       {
           var provider = new FileExtensionContentTypeProvider();
           string contentType;
           if(!provider.TryGetContentType(path, out contentType))
           {
               contentType = "application/octet-stream";
           }
           return contentType;
       }

    }
}