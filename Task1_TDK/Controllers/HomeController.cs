using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Task1_TDK.Models;

namespace Task1_TDK.Controllers
{
    public class HomeController : Controller
    {
        CatalogModel cm = new CatalogModel();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public JsonResult GetDataCatalogue(string Search)
        {
            JRes j = new JRes(new List<object>(), false, "");
            List<T_Catalogue> T_Catalogue = new List<T_Catalogue>();
            try
            {
                DataTable dt = new DataTable();
                dt = cm.GetDataCatalogue(Search);
                foreach (DataRow dr in dt.Rows)
                {
                    T_Catalogue.Add(new Models.T_Catalogue()
                    {
                        Ref_ID = dr["Ref_ID"].ToString(),
                        Name = dr["Name"].ToString(),
                        Description = dr["Description"].ToString(),
                    });
                }
                j.Result = true;
                j.Data.Add(T_Catalogue);
            }
            catch (Exception ex)
            {
                j.Result = false;
                j.Msg = ex.Message;
            }
            return Json(j, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddUpdate_Cookie(string Ref_ID, string Name, string Description, string Status)
        {
            JRes j = new JRes(new List<object>(), false, "");
            List<T_Catalogue> T_Catalogue = new List<T_Catalogue>();
            try
            {
                string _Ref_ID = Ref_ID;
                if(Status ==  "Add")
                {
                    _Ref_ID = cm.GenerateRef_ID();
                }
                T_Catalogue.Add(new Models.T_Catalogue()
                {
                    Ref_ID = _Ref_ID,
                    Name = Name,
                    Description = Description
                });

                // open begin tran
                SqlTransaction tran;
                MSSQL sql = new MSSQL();
                sql.SQLCon(sql.ConStr);
                tran = sql.SqlConHd.BeginTransaction();
                if (Status == "Add")
                {
                    cm.AddNewCatalog(T_Catalogue, sql, tran);
                }
                else
                {
                    cm.UpdateCatalog(T_Catalogue, sql, tran);
                }
                    
                tran.Commit();
                j.Result = true;
                j.Data.Add(T_Catalogue[0].Ref_ID);
            }
            catch (Exception ex)
            {
                j.Result = false;
                j.Msg = ex.Message;
            }
            return Json(j, JsonRequestBehavior.AllowGet);
        }



        public JsonResult Delete_Cookie(string Ref_ID)
        {
            JRes j = new JRes(new List<object>(), false, "");
            try
            {
                // open begin tran
                SqlTransaction tran;
                MSSQL sql = new MSSQL();
                sql.SQLCon(sql.ConStr);
                tran = sql.SqlConHd.BeginTransaction();
                cm.DeleteCatalog(Ref_ID, sql, tran);
                tran.Commit();
                j.Result = true;
            }
            catch (Exception ex)
            {
                j.Result = false;
                j.Msg = ex.Message;
            }
            return Json(j, JsonRequestBehavior.AllowGet);
        }
    }
}