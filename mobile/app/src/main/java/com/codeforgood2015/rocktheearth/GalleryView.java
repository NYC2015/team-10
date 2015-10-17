package com.codeforgood2015.rocktheearth;

import android.os.Environment;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import java.io.File;

public class GalleryView extends AppCompatActivity {
    private static final String FILE_TYPE = "images/*";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_gallery);

        String root = Environment.getExternalStorageDirectory().toString() + "/RocktheEarth";

        File myDir = new File(root + "/Gallery");
    }
}
