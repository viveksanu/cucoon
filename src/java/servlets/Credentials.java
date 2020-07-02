
package servlets;

/**
 *
 * @author vivek
 */
public class Credentials {

        static String DB_URL="jdbc:mysql://localhost:3306/cucoon?characterEncoding=latin1";
         static   String USER = "root";
         static   String PASS = "vivek";
  
   

    static String forName = "com.mysql.jdbc.Driver";

    public static String getDB_URL() {
        return DB_URL;
    }

    public static String getUSER() {
        return USER;
    }

    public static String getPASS() {
        return PASS;
    }

    public static String getForName() {
        return forName;
    }
}
