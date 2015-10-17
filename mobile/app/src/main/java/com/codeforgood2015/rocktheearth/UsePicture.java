package com.codeforgood2015.rocktheearth;

import android.content.Intent;
import android.database.sqlite.SQLiteDatabase;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Environment;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.Toast;

import java.io.File;
import java.io.FileOutputStream;

public class UsePicture extends AppCompatActivity {
    String imgdir, msg, p_name, p_email, p_zip, root;
    Database myDb;
    File myDir;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_use_picture);
        Bundle bundle = getIntent().getExtras();
        root = Environment.getExternalStorageDirectory().toString() + "/RocktheEarth";
        myDir = new File(root + "/Logs");
        myDir.mkdirs();
        myDb = new Database(this, root + "/mySQL/");
        if(bundle.getString("imageDir")!= null)
        {
            imgdir = bundle.getString("imageDir");
        }
        Log.d("bruh", "result: " + imgdir);


        p_name = bundle.getString("username");
        p_email = bundle.getString("email");
        p_zip = bundle.getString("zipcode");


        ImageView imgview = (ImageView) findViewById(R.id.usedImage);

        imgview.setImageBitmap(BitmapFactory.decodeFile(imgdir));

        Spinner spinner = (Spinner) findViewById(R.id.msgspinner);
        final ArrayAdapter<CharSequence> messages = ArrayAdapter.createFromResource(this,
                R.array.messages, android.R.layout.simple_spinner_item);
        messages.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(messages);
        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                msg =  parent.getItemAtPosition(position).toString();
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        final Button submit_button = (Button) findViewById(R.id.submit_button);
        submit_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(UsePicture.this, RegisterPage.class);


                String fname =  "logs.csv";
                File file = new File(myDir, fname);

                boolean isInserted = myDb.insertData(p_name, p_email, p_zip);



                String string = p_name + ", " + p_email + ", " + p_zip + ", " + imgdir + "\n";
                try {

                    FileOutputStream out = new FileOutputStream(file, true);
                    out.write(string.getBytes());
                    out.close();

                } catch (Exception e) {
                    e.printStackTrace();
//                    outputStream = openFileOutput(filename, Context.MODE_APPEND);
                    
                }

                startActivity(intent);
            }
        });

    }


}
