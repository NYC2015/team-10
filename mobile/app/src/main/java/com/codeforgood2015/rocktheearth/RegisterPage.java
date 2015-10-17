package com.codeforgood2015.rocktheearth;

import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.media.MediaScannerConnection;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import android.os.Environment;



import java.io.File;

public class RegisterPage extends AppCompatActivity {
    private Uri fileUri;
    private MediaScannerConnection conn;
    String p_name, p_email, p_zip;
    EditText name, email, zipcode;
    String root = Environment.getExternalStorageDirectory().toString() + "/RocktheEarth";
    Uri sfileUri;

//    DatabaseOperations myDb;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register_page);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
//        myDb = new DatabaseOperations(this);

        final EditText name = (EditText) findViewById(R.id.name_entry);
        final EditText email = (EditText) findViewById(R.id.email_entry);
        final EditText zipcode = (EditText) findViewById(R.id.zip_entry);


        Button camera_button = (Button) findViewById(R.id.camera_button);
        camera_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                p_name = name.getText().toString();
                p_email = email.getText().toString();
                p_zip = zipcode.getText().toString();
//                fileUri = getOutputMediaFileUri(MEDIA_TYPE_IMAGE); // create a file to save the image
                File myDir = new File(root + "/Capture");
                myDir.mkdirs();
                Long tsLong = System.currentTimeMillis()/1000;
                String ts = tsLong.toString();
                sfileUri = Uri.fromFile(new File(root + "/Capture/" + ts + ".jpg"));
                intent.putExtra(MediaStore.EXTRA_OUTPUT, sfileUri);
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


                File myDir = new File(root + "/Gallery");
                Toast.makeText(RegisterPage.this, (myDir.toString()),
                        Toast.LENGTH_SHORT).show();
                myDir.mkdirs();
                Intent intent = new Intent(RegisterPage.this, GalleryView.class);
                intent.putExtra("username", p_name);
                intent.putExtra("email", p_email);
                intent.putExtra("zipcode", p_zip);
                RegisterPage.this.startActivity(intent);

            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data){
        if (requestCode == 0) {
            Intent change = new Intent(RegisterPage.this, UsePicture.class);
            change.putExtra("username", p_name);
            change.putExtra("email", p_email);
            change.putExtra("zipcode", p_zip);
            change.putExtra("imageDir", sfileUri.toString().substring(7, sfileUri.toString().length()));
            Log.d("bruh", sfileUri.toString().substring(7, sfileUri.toString().length()));

            startActivity(change);
        }
    }

    @Override
    public void onBackPressed() {
        return;
    }
}

