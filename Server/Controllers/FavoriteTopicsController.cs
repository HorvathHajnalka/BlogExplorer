using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlogExplorer.Data;
using Server.Models;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteTopicsController : ControllerBase
    {
        private readonly DataContext _context;

        public FavoriteTopicsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/FavoriteTopics
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FavoriteTopic>>> GetFavoriteTopics()
        {
            return await _context.FavoriteTopics.ToListAsync();
        }

        // GET: api/FavoriteTopics/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FavoriteTopic>> GetFavoriteTopic(int id)
        {
            var favoriteTopic = await _context.FavoriteTopics.FindAsync(id);

            if (favoriteTopic == null)
            {
                return NotFound();
            }

            return favoriteTopic;
        }

        // PUT: api/FavoriteTopics/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFavoriteTopic(int id, FavoriteTopic favoriteTopic)
        {
            if (id != favoriteTopic.UserId)
            {
                return BadRequest();
            }

            _context.Entry(favoriteTopic).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FavoriteTopicExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/FavoriteTopics
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FavoriteTopic>> PostFavoriteTopic(FavoriteTopic favoriteTopic)
        {
            _context.FavoriteTopics.Add(favoriteTopic);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (FavoriteTopicExists(favoriteTopic.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetFavoriteTopic", new { id = favoriteTopic.UserId }, favoriteTopic);
        }

        // DELETE: api/FavoriteTopics/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFavoriteTopic(int id)
        {
            var favoriteTopic = await _context.FavoriteTopics.FindAsync(id);
            if (favoriteTopic == null)
            {
                return NotFound();
            }

            _context.FavoriteTopics.Remove(favoriteTopic);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FavoriteTopicExists(int id)
        {
            return _context.FavoriteTopics.Any(e => e.UserId == id);
        }
    }
}
