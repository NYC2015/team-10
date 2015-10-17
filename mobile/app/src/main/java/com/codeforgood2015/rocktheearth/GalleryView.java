package com.codeforgood2015.rocktheearth;

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.MediaScannerConnection;
import android.os.Environment;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.GridView;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.Toast;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class GalleryView extends AppCompatActivity {
    private static final String FILE_TYPE = "images/*";

    ArrayList<String> images = new ArrayList<String>();
    File[] listFile;
    String p_name, p_email, p_zip;
    private ImageAdapter imageAdapter;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Bundle bundle = getIntent().getExtras();
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_gallery);

        String root = Environment.getExternalStorageDirectory().toString() + "/RocktheEarth";

        File myDir = new File(root + "/Gallery");

        listFile = myDir.listFiles();
        for (int i=0; i<listFile.length; i++){
            images.add(listFile[i].getAbsolutePath());
        }

        ListView imggrid = (ListView) findViewById(R.id.gallery_grid);
        imageAdapter = new ImageAdapter();
        imggrid.setAdapter(imageAdapter);

        p_name = bundle.getString("username");
        p_email = bundle.getString("email");
        p_zip = bundle.getString("zipcode");

    }

    public class ImageAdapter extends BaseAdapter {
        private LayoutInflater mInflater;

        public ImageAdapter() {
            mInflater = (LayoutInflater) getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        }

        public int getCount() {
            return images.size();
        }

        public Object getItem(int position) {
            return position;
        }

        public long getItemId(int position) {
            return position;
        }

        public View getView(int position, View convertView, ViewGroup parent) {
            final ViewHolder holder;
            if (convertView == null) {
                holder = new ViewHolder();
                convertView = mInflater.inflate(
                        R.layout.galleryitem, null);
                holder.imageview = (ImageView) convertView.findViewById(R.id.thumbImage);


                convertView.setTag(holder);
            }
            else {
                holder = (ViewHolder) convertView.getTag();
            }


            Bitmap myBitmap = BitmapFactory.decodeFile(images.get(position));
            holder.imageview.setImageBitmap(myBitmap);
            final int index = position;
            holder.imageview.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent(GalleryView.this, UsePicture.class);
                    intent.putExtra("imageDir", images.get(index));
                    intent.putExtra("username", p_name);
                    intent.putExtra("email", p_email);
                    intent.putExtra("zipcode", p_zip);
                    GalleryView.this.startActivity(intent);
                }
            });
            return convertView;
        }
    }

    class ViewHolder {
        ImageView imageview;


    }



}



