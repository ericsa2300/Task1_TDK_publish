using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Task1_TDK.Models
{
    public class CatalogModel
    {
        public string GenerateRef_ID()
        {
            string Ref_ID = "";
            string query = @"
                        declare  
	                        @Ref_ID nvarchar(6),
	                        @MaxId bigint
                        select 
	                        @MaxId = isnull(convert(int,right(max(Ref_ID),4))+1 ,1)
                        from T_Catalogue 

                        SET @Ref_ID= CAST('CC'+''+CAST(right('0000'+convert(varchar(20),@MaxId),4) AS varchar(20)) as NVARCHAR(50))

                        select Ref_ID = @Ref_ID";
            DataTable dt = new DataTable();
            using (MSSQL sql = new MSSQL())
            {
                dt = sql.ExecuteDTQuery(sql.ConStr, query, null, false);
            }
            foreach (DataRow dr in dt.Rows)
            {
                Ref_ID = dr["Ref_ID"].ToString();
            }
            return Ref_ID;
        }


        public DataTable GetDataCatalogue(string Search)
        {
            string query = @"
                        select * from T_Catalogue 
where Ref_ID like N'%" + Search + @"%' or
					Name like N'%" + Search + @"%' or
					Description like N'%" + Search + @"%'";
            DataTable dt = new DataTable();
            using (MSSQL sql = new MSSQL())
            {
                dt = sql.ExecuteDTQuery(sql.ConStr, query, null, false);
            }
            return dt;
        }


        public void AddNewCatalog(List<T_Catalogue> T_Catalogue, MSSQL _sql, SqlTransaction _tran)
        {
            string query = @"
                insert into T_Catalogue(Ref_ID, Name, Description)
                select 
                    Ref_ID = N'" + T_Catalogue[0].Ref_ID + @"',
					Name = N'" + T_Catalogue[0].Name + @"',
					Description = N'" + T_Catalogue[0].Description + @"'";
            _sql.ExecuteNonQuery(_sql.ConStr, query, _tran, true);
        }


        public void UpdateCatalog(List<T_Catalogue> T_Catalogue, MSSQL _sql, SqlTransaction _tran)
        {
            string query = @"
                    update T_Catalogue set 
                        Name = N'" + T_Catalogue[0].Name + @"',
	                    Description = N'" + T_Catalogue[0].Description + @"'
                    where Ref_ID = N'" + T_Catalogue[0].Ref_ID + @"'";
            _sql.ExecuteNonQuery(_sql.ConStr, query, _tran, true);
        }

        public void DeleteCatalog(string Ref_ID, MSSQL _sql, SqlTransaction _tran)
        {
            string query = @"
                    delete from T_Catalogue 
                    where Ref_ID = N'" + Ref_ID + @"'";
            _sql.ExecuteNonQuery(_sql.ConStr, query, _tran, true);
        }


    }

    public class T_Catalogue
    {
        public string Ref_ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}