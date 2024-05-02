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
        [HttpGet("{userId}/{topicId}")]
        public async Task<ActionResult<FavoriteTopic>> GetFavoriteTopic(int userId, int topicId)
        {
            var favoriteTopic = await _context.FavoriteTopics.FindAsync(userId, topicId);

            if (favoriteTopic == null)
            {
                return NotFound();
            }

            return favoriteTopic;
        }

        // PUT: api/FavoriteTopics/5/3
        [HttpPut("{userId}/{topicId}")]
        public async Task<IActionResult> PutFavoriteTopic(int userId, int topicId, FavoriteTopic favoriteTopic)
        {
            if (userId != favoriteTopic.UserId || topicId != favoriteTopic.TopicId)
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
                if (!FavoriteTopicExists(userId, topicId))
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
                if (FavoriteTopicExists(favoriteTopic.UserId, favoriteTopic.TopicId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetFavoriteTopic", new { userId = favoriteTopic.UserId, topicId = favoriteTopic.TopicId }, favoriteTopic);
        }

        private bool FavoriteTopicExists(int userId, int topicId)
        {
            return _context.FavoriteTopics.Any(e => e.UserId == userId && e.TopicId == topicId);
        }



        // DELETE: api/FavoriteTopics/5
        [HttpDelete("{userId}/{topicId}")]
        public async Task<IActionResult> DeleteFavoriteTopic(int userId, int topicId)
        {
            // Keresés összetett kulcs alapján
            var favoriteTopic = await _context.FavoriteTopics.FindAsync(userId, topicId);
            if (favoriteTopic == null)
            {
                return NotFound();
            }

            _context.FavoriteTopics.Remove(favoriteTopic);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
