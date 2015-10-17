package com.codeforgood2015.rocktheearth;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import java.util.jar.Attributes;


public class DatabaseOperations extends SQLiteOpenHelper{
    public static final String DATABASE_NAME = "Registration.db";
    public static final String TableName = "Registration Information";
    public static final String COL_1 = "Name";
    public static final String COL_2 = "Email";
    public static final String COL_3 = "ZipCode";

    public DatabaseOperations(Context context){
        super(context, DATABASE_NAME, null,1);
        SQLiteDatabase db = this.getWritableDatabase();
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL("Create table " + TableName +" (Name TEXT PRIMARY KEY,Email TEXT,ZipCode INTEGER)");
    }

    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS " + TableName);
        onCreate(db);
    }




}
