using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Task1_TDK.Models
{
    public class JRes
    {
        private List<object> data;
        private bool result;
        private string msg;

        public List<object> Data
        {
            get
            {
                return data;
            }

            set
            {
                data = value;
            }
        }

        public bool Result
        {
            get
            {
                return result;
            }

            set
            {
                result = value;
            }
        }

        public string Msg
        {
            get
            {
                return msg;
            }

            set
            {
                msg = value;
            }
        }


        /// <summary>
        /// Instantiate new JRES object
        /// </summary>
        /// <param name="datalist">Any new list to perform add function</param>
        /// <param name="result">default set to false</param>
        /// <param name="message">default set to ""</param>
        public JRes(List<object> datalist, bool result, string message)
        {
            this.Data = datalist;
            this.Msg = message;
            this.Result = result;
        }
    }
    public class DRes<T>
    {
        public T data { get; set; }
        public bool result { get; set; }
        public string msg { get; set; }
    }
}