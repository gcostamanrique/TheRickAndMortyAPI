using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace TheRickAndMortyAPIVisualizacao.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
