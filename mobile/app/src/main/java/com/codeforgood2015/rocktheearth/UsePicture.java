package com.codeforgood2015.rocktheearth;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.Toast;

public class UsePicture extends AppCompatActivity {
    String imgdir, msg;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_use_picture);
        Bundle bundle = getIntent().getExtras();

        if(bundle.getString("imageDir")!= null)
        {
            imgdir = bundle.getString("imageDir");
        }

        Toast.makeText(UsePicture.this, (imgdir),
                Toast.LENGTH_SHORT).show();


        ImageView imgview = (ImageView) findViewById(R.id.usedImage);
        if(imgdir == "captured")
            imgview.setImageBitmap((Bitmap) bundle.get("capture"));

        else
            imgview.setImageBitmap(BitmapFactory.decodeFile(imgdir));

        Spinner spinner = (Spinner) findViewById(R.id.msgspinner);
        final ArrayAdapter<CharSequence> messages = ArrayAdapter.createFromResource(this,
                R.array.messages, android.R.layout.simple_spinner_item);
        messages.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(messages);
        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                msg = (String) parent.getItemAtPosition(position).toString();
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

    }
}
