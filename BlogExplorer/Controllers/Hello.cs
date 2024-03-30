using Microsoft.AspNetCore.Mvc;

namespace SimpleAPI.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class HelloController : ControllerBase
	{
		[HttpGet]
		public IActionResult Get()
		{
			return Ok("Hello from ASP.NET Core API!");
		}
	}
}