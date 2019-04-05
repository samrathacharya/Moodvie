import os
import time
import sqlite3
import sys

class Read(object):
    def __init__(self, read_method, read_position):
        self.__read_method = read_method
        self.__read_position = read_position
        #self.is_empty = 1 #apparently read_db object reuqires this attribute
    @property
    def read_position(self):
        return self.__read_position
    @read_position.setter
    def read_position(self, position):
        self.__read_position = position

class Read_db(Read):
    def __init__(self, read_position):
        Read.__init__(self, 'db', read_position)
    # db open callee
    def open(self):
        try:
            conn = sqlite3.connect(self.read_position)
            cur = conn.cursor()
        except:
            print("Error:", sys.exc_info()[0])
        return (conn, cur)
    # db close callee
    def close(self, conn):
        # close
        conn.close()

class Read_db_user(Read_db):
    def __init__(self, read_position):
        Read_db.__init__(self, read_position)
    # check username
    def checkU(self, username):
        db_handle = self.open()
        conn = db_handle[0]
        cur = db_handle[1]
        arr = cur.execute("select * from user where USERNAME='"+username+"'")
        if arr.fetchall() == []:
            print("True for username\n")
            self.close(conn)
            return True
        else:
            print("False for username\n")
            self.close(conn)
            return False

    # check email
    def checkE(self, email):
        db_handle = self.open()
        conn = db_handle[0]
        cur = db_handle[1]
        arr = cur.execute("select * from user where EMAIL='"+email+"'")
        if arr.fetchall() == []:
            print("True for email\n")
            self.close(conn)
            return True
        else:
            print("False for email\n")
            self.close(conn)
            return False
    # check login validity
    def checkAccount(self, username,pass_w):
        db_handle = self.open()
        conn = db_handle[0]
        cur = db_handle[1]
        cursor = cur.execute("SELECT USERNAME,PASSWORD,EMAIL from user")
        for row in cursor:
            if row[0] == username and row[1] == pass_w:
                self.close(conn)
                return True
        self.close(conn)
        return False


class Write(object):
    def __init__(self, write_method, write_position):
        self.__write_method = write_method
        self.__write_position = write_position
    @property
    def write_position(self):
        return self.__write_position
    @write_position.setter
    def write_position(self,position):
        self.__write_position = position

class Write_db(Write):
    def __init__(self, write_position):
        Write.__init__(self, 'db', write_position)
    # db open callee
    def open(self):
        try:
            conn = sqlite3.connect(self.write_position)
            cur = conn.cursor()
        except:
            print("Error:", sys.exc_info()[0])
        return (conn, cur)
    # db close callee
    def close(self, conn):
        # always do the saving
        conn.commit()
        # close
        conn.close()

class Write_db_user(Write_db):
    def __init__(self, write_position):
        Write_db.__init__(self, write_position)

    # register a new account into the database
    def register(self, user_n, pass_w, e_mail):
        print("hello\n")
        reader = Read_db_user("database/USER.db")
        if reader.checkU(user_n) and reader.checkE(e_mail):
            db_handle = self.open()
            conn = db_handle[0]
            cur = db_handle[1]
            cur.execute("INSERT INTO user(USERNAME,PASSWORD,EMAIL) VALUES(?,?,?)",(user_n,pass_w,e_mail))
            self.close(conn)
            return True
        else:
            return False