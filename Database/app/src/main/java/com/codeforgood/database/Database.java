package com.codeforgood.database;

import android.content.ContentValues;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class Database extends SQLiteOpenHelper{
    public static final String DATABASE_NAME = "Registration.db";
    public static final String TableName = "Registration Information";
    public static final String COL_1 = "Name";
    public static final String COL_2 = "Email";
    public static final String COL_3 = "ZipCode";

    public Database(Context context){
        super(context, DATABASE_NAME, null,1);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL("Create table " + TableName + " (Name TEXT PRIMARY KEY,Email TEXT,ZipCode INTEGER)");
    }

    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS " + TableName);
        onCreate(db);
    }

    public boolean insertData(String name, String email, String zipcode){
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put(COL_1,name);
        contentValues.put(COL_2,email);
        contentValues.put(COL_3,zipcode);
        long result = db.insert(TableName, null,contentValues);
        if (result == -1){
            return false;
        }
        else{
            return true;
        }
    }
}
