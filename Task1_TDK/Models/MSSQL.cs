using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;

namespace Task1_TDK.Models
{
    public class MSSQL : IDisposable
    {
        bool disposed = false;
        public string ConStr = ConfigurationManager.ConnectionStrings["ConStr"].ToString();
        public int CommandTimeout = Convert.ToInt32(ConfigurationManager.AppSettings["CommandTimeout"]);
        public SqlConnection SqlConHd = new SqlConnection();
        /// <summary>
        /// Open Connection to Database
        /// </summary>
        /// <param name="ConStr">Connection string</param>
        /// <returns>true or false</returns>
        public bool SQLCon(string ConStr)
        {
            SqlConHd.ConnectionString = ConStr;

            try
            {
                SqlConHd.Open();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public void SQLCloseCon()
        {
            SqlConnection.ClearPool(SqlConHd);
            SqlConHd.Dispose();
            SqlConHd.Close();
        }
        //public bool isSystemConnected(string Connection, bool _persist)
        //{
        //    try
        //    {
        //        if (SqlConHd.State == ConnectionState.Closed)
        //        {
        //            SQLCon(Connection);
        //        }

        //    }
        //    catch (Exception ex)
        //    {

        //        return false;
        //    }
        //    finally
        //    {
        //        if (!_persist)
        //        {
        //            SQLCloseCon();
        //        }
        //    }
        //    return true;

        //}
        public DataTable ExecDTQuery(string Connection, string command, List<ctSqlVariable> parameters, SqlTransaction Tranx, bool _persist)
        {
            try
            {
                if (SqlConHd.State == ConnectionState.Closed)
                {
                    SQLCon(Connection);
                }
                SqlCommand Selectcommand = new SqlCommand(command, SqlConHd);
                if (CommandTimeout > 0)
                {
                    Selectcommand.CommandTimeout = CommandTimeout;
                }
                DataSet ds = new DataSet();
                SqlDataAdapter DataAd = new SqlDataAdapter();
                DataAd.SelectCommand = Selectcommand;
                if (parameters != null)
                {
                    foreach (var row in parameters)
                    {
                        Selectcommand.Parameters.Add("@" + row.Name, SqlDbType.VarChar).Value = row.Value;
                    }
                }

                if (Tranx != null)
                {
                    DataAd.SelectCommand.Transaction = Tranx;
                }
                DataAd.Fill(ds);
                if ((ds != null) && (ds.Tables.Count > 0))
                {
                    return ds.Tables[0];
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {

                if (Tranx != null)
                {
                    Tranx.Rollback();
                }
                throw ex;
            }
            finally
            {
                if (!_persist)
                {
                    SQLCloseCon();
                }
            }
        }

        public string ExecSPWithOutput(string StrCon, string sp, Dictionary<string, string> sPParams, string outputVar, SqlDbType _outputtype, int _outputlength, SqlTransaction Tranx, bool _persist)
        {
            try
            {
                if (SqlConHd.State == ConnectionState.Closed)
                {
                    SQLCon(StrCon);
                }
                if (SqlConHd.State == ConnectionState.Closed)
                {
                    throw new Exception("Connection closed!");
                }
                SqlCommand SqlCom = new SqlCommand(sp, SqlConHd);
                if (CommandTimeout > 0)
                {
                    SqlCom.CommandTimeout = CommandTimeout;
                }
                if (Tranx != null)
                {
                    SqlCom.Transaction = Tranx;
                }
                SqlCom.CommandType = CommandType.StoredProcedure;

                foreach (KeyValuePair<string, string> item in sPParams)
                {
                    SqlCom.Parameters.AddWithValue(item.Key, item.Value);
                }

                SqlCom.Parameters.Add(outputVar, _outputtype, _outputlength).Direction = ParameterDirection.Output;

                SqlCom.ExecuteNonQuery();
                return SqlCom.Parameters[outputVar].Value.ToString();

            }
            catch (Exception Exp)
            {
                if (Tranx != null)
                {
                    Tranx.Rollback();
                }
                throw Exp;
            }
            finally
            {
                if (!_persist)
                {
                    SQLCloseCon();
                }
            }
        }

        public dynamic ExecSPWithOutPut(string StrCon, string sp, Dictionary<string, string> sPParams, string outputVar, SqlDbType _outputtype, int _outputlength, SqlTransaction Tranx, bool _persist)
        {
            try
            {
                if (SqlConHd.State == ConnectionState.Closed)
                {
                    SQLCon(StrCon);
                }
                if (SqlConHd.State == ConnectionState.Closed)
                {
                    throw new Exception("Connection closed!");
                }
                SqlCommand SqlCom = new SqlCommand(sp, SqlConHd);
                if (CommandTimeout > 0)
                {
                    SqlCom.CommandTimeout = CommandTimeout;
                }
                if (Tranx != null)
                {
                    SqlCom.Transaction = Tranx;
                }
                SqlCom.CommandType = CommandType.StoredProcedure;

                foreach (KeyValuePair<string, string> item in sPParams)
                {
                    SqlCom.Parameters.AddWithValue(item.Key, item.Value);
                }

                SqlCom.Parameters.Add(outputVar, _outputtype, _outputlength).Direction = ParameterDirection.Output;

                SqlCom.ExecuteNonQuery();

                return SqlCom.Parameters[outputVar].Value;
            }
            catch (Exception Exp)
            {
                if (Tranx != null)
                {
                    Tranx.Rollback();
                }
                throw Exp;
            }
            finally
            {
                if (!_persist)
                {
                    SQLCloseCon();
                }
            }
        }
        /// <summary>
        /// Function to call query into sql server database and return DATATABLE format
        /// </summary>
        /// <param name="StrCon">Connection string</param>
        /// <param name="SqlCmd">SQL Command to be execute</param>
        /// <param name="Tranx">Indicate if Transaction exist; NULL if non-transcational</param>
        /// <param name="_persist">FALSE means will close Connection immediately after query</param>
        /// <returns></returns>

        public DataTable ExecuteDTQuery(String StrCon, String SqlCmd, SqlTransaction Tranx, bool _persist)
        {
            try
            {
                if (SqlConHd.State == ConnectionState.Closed)
                {
                    SQLCon(StrCon);
                }

                SqlCommand Selectcommand = new SqlCommand(SqlCmd, SqlConHd);
                if (CommandTimeout > 0)
                {
                    Selectcommand.CommandTimeout = CommandTimeout;
                }
                DataSet ds = new DataSet();
                SqlDataAdapter DataAd = new SqlDataAdapter();
                DataTable Dt = new DataTable();
                DataAd.SelectCommand = Selectcommand;
                if (Tranx != null)
                {
                    DataAd.SelectCommand.Transaction = Tranx;
                }
                DataAd.Fill(ds);
                if ((ds != null) && (ds.Tables.Count > 0))
                {
                    return ds.Tables[0];
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                if (Tranx != null)
                {
                    Tranx.Rollback();
                }
                throw ex;
            }
            finally
            {
                if (!_persist)
                {
                    SQLCloseCon();
                }
            }
        }

        public DataTable ExecuteDTQueryWithParam(string Connection, string command, List<SFSQLParameter> parameters = null, SqlTransaction Tranx = null, bool _persist = false)
        {
            try
            {
                if (SqlConHd.State == ConnectionState.Closed)
                {
                    SQLCon(Connection);
                }
                SqlCommand Selectcommand = new SqlCommand(command, SqlConHd);
                if (CommandTimeout > 0)
                {
                    Selectcommand.CommandTimeout = CommandTimeout;
                }
                DataSet ds = new DataSet();
                SqlDataAdapter DataAd = new SqlDataAdapter();
                DataAd.SelectCommand = Selectcommand;
                if (parameters != null)
                {
                    foreach (var row in parameters)
                    {
                        Selectcommand.Parameters.Add("@" + row.Name, SqlDbType.VarChar).Value = row.Value;
                    }
                }

                if (Tranx != null)
                {
                    DataAd.SelectCommand.Transaction = Tranx;
                }
                DataAd.Fill(ds);
                if ((ds != null) && (ds.Tables.Count > 0))
                {
                    return ds.Tables[0];
                }
                else
                {
                    return null;
                }
            }
            catch (SqlException ex)
            {

                if (Tranx != null)
                {
                    Tranx.Rollback();
                }
                throw ex;
            }
            finally
            {
                if (!_persist)
                {
                    SQLCloseCon();
                }
            }
        }

        public DataTable ExecuteStoProcDataTable(string Connection, string Command, List<SFSQLParameter> param = null)
        {
            DataTable table = new DataTable();
            try
            {

                using (var con = new SqlConnection(Connection))
                using (var cmd = new SqlCommand(Command, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    if (CommandTimeout > 0)
                    {
                        cmd.CommandTimeout = CommandTimeout;
                    }
                    cmd.CommandType = CommandType.StoredProcedure;
                    foreach (var row in param)
                    {
                        cmd.Parameters.Add("@" + row.Name, SqlDbType.VarChar).Value = row.Value;
                    }
                    da.Fill(table);
                }

            }
            catch (SqlException ex)
            {
                throw ex;
            }
            return table;
        }

        public DataSet ExecuteStoProcDataSet(string Connection, string Command, List<SFSQLParameter> param = null)
        {
            DataSet Set = new DataSet();
            try
            {

                using (var con = new SqlConnection(Connection))
                using (var cmd = new SqlCommand(Command, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    if (CommandTimeout > 0)
                    {
                        cmd.CommandTimeout = CommandTimeout;
                    }
                    cmd.CommandType = CommandType.StoredProcedure;
                    foreach (var row in param)
                    {
                        cmd.Parameters.Add("@" + row.Name, SqlDbType.VarChar).Value = row.Value;
                    }
                    da.Fill(Set);

                }

            }
            catch (SqlException ex)
            {
                throw ex;
            }
            if ((Set != null) && (Set.Tables.Count > 0))
            {
                return Set;
            }
            else
            {
                return null;
            }
        }

        public string ExecuteStoredProcedure(string StrCon, string SqlCmd, SqlTransaction Tranx, bool _persist, string _comcod, string _ctlFld)
        {
            try
            {
                if (SqlConHd.State == ConnectionState.Closed)
                {
                    SQLCon(StrCon);
                }
                if (SqlConHd.State == ConnectionState.Closed)
                {
                    throw new Exception("Connection closed!");
                }
                SqlCommand SqlCom = new SqlCommand(SqlCmd, SqlConHd);
                if (CommandTimeout > 0)
                {
                    SqlCom.CommandTimeout = CommandTimeout;
                }
                if (Tranx != null)
                {
                    SqlCom.Transaction = Tranx;
                }
                SqlCom.CommandType = CommandType.StoredProcedure;
                SqlCom.Parameters.AddWithValue("@pComcod", _comcod);
                SqlCom.Parameters.AddWithValue("@pCtlFld", _ctlFld);
                SqlCom.Parameters.Add("@pOutCtlNum", SqlDbType.VarChar, 50).Direction = ParameterDirection.Output;

                SqlCom.ExecuteNonQuery();
                return SqlCom.Parameters["@pOutCtlNum"].Value.ToString();

            }
            catch (Exception Exp)
            {
                if (Tranx != null)
                {
                    Tranx.Rollback();
                }
                throw Exp;
            }
            finally
            {
                if (!_persist)
                {
                    SQLCloseCon();
                }
            }
        }

        public Int64 ExecNonQuery(string Connection, string command, List<ctSqlVariable> parameters, SqlTransaction Tranx, bool _persist)
        {
            try
            {
                if (SqlConHd.State == ConnectionState.Closed)
                {
                    SQLCon(Connection);
                }
                if (SqlConHd.State == ConnectionState.Closed)
                {
                    return -1;
                }
                SqlCommand SqlCom = new SqlCommand(command, SqlConHd);
                if (CommandTimeout > 0)
                {
                    SqlCom.CommandTimeout = CommandTimeout;
                }
                if (parameters != null)
                {
                    foreach (var row in parameters)
                    {
                        SqlCom.Parameters.Add("@" + row.Name, SqlDbType.VarChar).Value = row.Value;
                    }
                }
                if (Tranx != null)
                {
                    SqlCom.Transaction = Tranx;

                }

                Int64 num = new Int64();

                num = SqlCom.ExecuteNonQuery();
                if (Tranx != null)
                {
                    Tranx.Commit();
                }
                return num;
            }
            catch (Exception Exp)
            {
                if (Tranx != null)
                {
                    Tranx.Rollback();
                }
                throw Exp;
            }
            finally
            {
                if (!_persist)
                {
                    SQLCloseCon();
                }
            }
        }

        public Int64 ExecuteNonQueryWithParams(string Connection, string command, List<SFSQLParameter> parameters = null, SqlTransaction Tranx = null, bool _persist = false)
        {
            bool isSuccess = true;
            try
            {
                if (SqlConHd.State == ConnectionState.Closed)
                {
                    SQLCon(Connection);
                }
                if (SqlConHd.State == ConnectionState.Closed)
                {
                    return -1;
                }
                SqlCommand SqlCom = new SqlCommand(command, SqlConHd);
                if (CommandTimeout > 0)
                {
                    SqlCom.CommandTimeout = CommandTimeout;
                }
                if (parameters != null)
                {
                    foreach (var row in parameters)
                    {
                        SqlCom.Parameters.Add("@" + row.Name, SqlDbType.VarChar).Value = row.Value;
                    }
                }
                if (Tranx != null)
                {
                    SqlCom.Transaction = Tranx;

                }

                Int64 num = new Int64();

                num = SqlCom.ExecuteNonQuery();

                return num;
            }
            catch (SqlException Exp)
            {
                isSuccess = false;
                if (Tranx != null)
                {
                    Tranx.Rollback();
                }

                throw Exp;
            }
            finally
            {
                if (!_persist)
                {
                    if (Tranx != null && isSuccess)
                    {
                        Tranx.Commit();
                    }
                    SQLCloseCon();
                }
            }
        }

        public string ExecuteScalarWithParams(string Connection, string command, List<SFSQLParameter> parameters = null, SqlTransaction Tranx = null, bool _persist = false)
        {
            try
            {
                if (SqlConHd.State == ConnectionState.Closed)
                {
                    SQLCon(Connection);
                }
                if (SqlConHd.State == ConnectionState.Closed)
                {
                    return "-1";
                }

                SqlCommand SqlCom = new SqlCommand(command, SqlConHd);
                if (CommandTimeout > 0)
                {
                    SqlCom.CommandTimeout = CommandTimeout;
                }
                if (Tranx != null)
                {
                    SqlCom.Transaction = Tranx;
                }


                if (SqlCom.ExecuteScalar() == null)
                {
                    return "";
                }
                else
                {
                    return SqlCom.ExecuteScalar().ToString();
                }
            }
            catch (SqlException ex)
            {
                if (Tranx != null)
                {
                    Tranx.Rollback();
                }
                throw ex;
            }
            finally
            {
                if (!_persist)
                {
                    SQLCloseCon();
                }
            }
        }

        public string ExecuteStoProcScalar(string StrCon, string SqlCmd, List<ctSqlVariable> param)
        {
            try
            {

                using (var con = new SqlConnection(StrCon))
                using (var cmd = new SqlCommand(SqlCmd, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    if (CommandTimeout > 0)
                    {
                        cmd.CommandTimeout = CommandTimeout;
                    }
                    con.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    foreach (var row in param)
                    {
                        cmd.Parameters.Add("@" + row.Name, SqlDbType.VarChar).Value = row.Value;
                    }
                    return cmd.ExecuteScalar().ToString();
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        /// <summary>
        /// Function to call query into sql server database and return DATASET format
        /// </summary>
        /// <param name="StrCon">Connection string</param>
        /// <param name="SqlCmd">SQL Command to be execute</param>
        /// <param name="Tranx">Indicate if Transaction exist; NULL if non-transcational</param>
        /// <param name="_persist">FALSE means will close Connection immediately after query</param>
        /// <returns></returns>
        public DataSet ExecuteDSQuery(String StrCon, String SqlCmd, SqlTransaction Tranx, bool _persist)
        {
            try
            {
                if (SqlConHd.State == ConnectionState.Closed)
                {
                    SQLCon(StrCon);
                }

                SqlCommand Selectcommand = new SqlCommand(SqlCmd, SqlConHd);
                if (CommandTimeout > 0)
                {
                    Selectcommand.CommandTimeout = CommandTimeout;
                }
                DataSet ds = new DataSet();
                SqlDataAdapter DataAd = new SqlDataAdapter();
                DataAd.SelectCommand = Selectcommand;
                if (Tranx != null)
                {
                    DataAd.SelectCommand.Transaction = Tranx;
                }
                DataAd.Fill(ds);
                if ((ds != null) && (ds.Tables.Count > 0))
                {
                    return ds;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                if (Tranx != null)
                {
                    Tranx.Rollback();
                }
                throw ex;
            }
            finally
            {
                if (!_persist)
                {
                    SQLCloseCon();
                }

            }
        }


        /// <summary>
        ///  Function to execute query into sql server database and return number of record affected
        /// </summary>
        /// <param name="StrCon">Connection string</param>
        /// <param name="SqlCmd">SQL Command to be execute</param>
        /// <param name="Tranx">Indicate if Transaction exist; NULL if non-transcational</param>
        /// <param name="_persist">FALSE means will close Connection immediately after query</param>
        /// <returns></returns>
        public Int64 ExecuteNonQuery(String StrCon, String SqlCmd, SqlTransaction Tranx, bool _persist)
        {
            try
            {
                if (SqlConHd.State == ConnectionState.Closed)
                {
                    SQLCon(StrCon);
                }
                if (SqlConHd.State == ConnectionState.Closed)
                {
                    return -1;
                }
                SqlCommand SqlCom = new SqlCommand(SqlCmd, SqlConHd);
                if (CommandTimeout > 0)
                {
                    SqlCom.CommandTimeout = CommandTimeout;
                }
                if (Tranx != null)
                {
                    SqlCom.Transaction = Tranx;
                }

                Int64 num = new Int64();

                num = SqlCom.ExecuteNonQuery();

                return num;
            }
            catch (Exception Exp)
            {
                if (Tranx != null)
                {
                    Tranx.Rollback();
                }
                throw Exp;
            }
            finally
            {
                if (!_persist)
                {
                    SQLCloseCon();
                }
            }
        }

        public string ExecuteScalar(String StrCon, String SqlCmd, SqlTransaction Tranx, bool _persist)
        {
            try
            {
                if (SqlConHd.State == ConnectionState.Closed)
                {
                    SQLCon(StrCon);
                }
                if (SqlConHd.State == ConnectionState.Closed)
                {
                    return "-1";
                }

                SqlCommand SqlCom = new SqlCommand(SqlCmd, SqlConHd);
                if (CommandTimeout > 0)
                {
                    SqlCom.CommandTimeout = CommandTimeout;
                }
                if (Tranx != null)
                {
                    SqlCom.Transaction = Tranx;
                }


                if (SqlCom.ExecuteScalar() == null)
                {
                    return "";
                }
                else
                {
                    return SqlCom.ExecuteScalar().ToString();
                }
            }
            catch (Exception ex)
            {
                if (Tranx != null)
                {
                    Tranx.Rollback();
                }
                throw ex;
            }
            finally
            {
                if (!_persist)
                {
                    SQLCloseCon();
                }
            }
        }

        public byte[] SetApprole(SqlConnection connection, string approle, string approlePassword)
        {
            StringBuilder sqlText = new StringBuilder();

            sqlText.Append("DECLARE @cookie varbinary(8000);");
            sqlText.Append("exec sp_setapprole @rolename = '" + approle + "', @password = '" + approlePassword + "'");
            sqlText.Append(",@fCreateCookie = true, @cookie = @cookie OUTPUT;");
            sqlText.Append(" SELECT @cookie");
            if (connection.State.Equals(ConnectionState.Closed))
                connection.Open();

            using (SqlCommand cmd = connection.CreateCommand())
            {
                cmd.CommandType = CommandType.Text;
                cmd.CommandText = sqlText.ToString();
                return (byte[])cmd.ExecuteScalar();
            }
        }
        public void UnsetApprole(SqlConnection connection, byte[] approleCookie)
        {
            if (connection.State.Equals(ConnectionState.Closed))
                connection.Open();

            using (SqlCommand cmd = connection.CreateCommand())
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "sp_unsetapprole";
                cmd.Parameters.AddWithValue("@cookie", approleCookie);
                cmd.ExecuteNonQuery();
            }
        }
        /// <summary>
        /// Comment by Jemmy, because it is not approriate to use common framework to cater for MVS Select List Item
        /// </summary>
        //public List<SelectListItem> DataTableToSelectList(DataTable _dt, string _display, string _value)
        //{
        //    List<SelectListItem> list = new List<SelectListItem>();

        //    foreach (DataRow row in _dt.Rows)
        //    {
        //        list.Add(new SelectListItem()
        //        {
        //            Text = row[_display].ToString(),
        //            Value = row[_value].ToString()
        //        });
        //    }
        //    return list;
        //}
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposed)
                return;

            if (disposing)
            {
                // Free any other managed objects here.
                //
            }

            // Free any unmanaged objects here.
            //
            disposed = true;
        }

        public class ctSqlVariable
        {
            public string Name { get; set; }
            public string Type { get; set; }
            public string Value { get; set; }
        }
        public class SFSQLParameter
        {
            public string Name { get; set; }
            public string Value { get; set; }
            public string DataType { get; set; }
        }
        ~MSSQL()
        {
            Dispose(false);
        }
    }
}