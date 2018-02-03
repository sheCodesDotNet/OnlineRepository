using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using MovieApp;

namespace MovieApp.Controllers
{
    public class RentalsController : ApiController
    {
        private movieAppEntities db = new movieAppEntities();

        // GET: api/Rentals
        public IQueryable<Rentals> GetRentals()
        {
            return db.Rentals;
        }

        // GET: api/Rentals/5
        [ResponseType(typeof(Rentals))]
        public IHttpActionResult GetRentals(int id)
        {
            Rentals rentals = db.Rentals.Find(id);
            if (rentals == null)
            {
                return NotFound();
            }

            return Ok(rentals);
        }

        // PUT: api/Rentals/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRentals(int id, Rentals rentals)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != rentals.RentalID)
            {
                return BadRequest();
            }

            db.Entry(rentals).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RentalsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Rentals
        [ResponseType(typeof(Rentals))]
        public IHttpActionResult PostRentals(Rentals rentals)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Rentals.Add(rentals);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = rentals.RentalID }, rentals);
        }

        // DELETE: api/Rentals/5
        [ResponseType(typeof(Rentals))]
        public IHttpActionResult DeleteRentals(int id)
        {
            Rentals rentals = db.Rentals.Find(id);
            if (rentals == null)
            {
                return NotFound();
            }

            db.Rentals.Remove(rentals);
            db.SaveChanges();

            return Ok(rentals);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RentalsExists(int id)
        {
            return db.Rentals.Count(e => e.RentalID == id) > 0;
        }
    }
}