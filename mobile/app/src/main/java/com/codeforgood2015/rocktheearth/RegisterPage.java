package com.codeforgood2015.rocktheearth;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import java.io.File;

public class RegisterPage extends AppCompatActivity {
    private Uri fileUri;

    String p_name, p_email, p_zip;
    EditText name, email, zipcode;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register_page);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        final EditText name = (EditText) findViewById(R.id.name_entry);
        final EditText email = (EditText) findViewById(R.id.email_entry);
        final EditText zipcode = (EditText) findViewById(R.id.zip_entry);
        File folder = new File("/sdcard/youfoldername/");


        Button camera_button = (Button) findViewById(R.id.camera_button);
        camera_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                p_name = name.getText().toString();
                p_email = email.getText().toString();
                p_zip = zipcode.getText().toString();
//                fileUri = getOutputMediaFileUri(MEDIA_TYPE_IMAGE); // create a file to save the image
                intent.putExtra(MediaStore.EXTRA_OUTPUT, fileUri);
                intent.putExtra("username", p_name);
                intent.putExtra("email", p_email);
                intent.putExtra("zipcode", p_zip);
                startActivityForResult(intent, 0);
            }
        });

        Button stockphoto_button = (Button) findViewById(R.id.stockphoto_button);
        stockphoto_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                p_name = name.getText().toString();
                p_email = email.getText().toString();
                p_zip = zipcode.getText().toString();

            }
        });
    }

}
