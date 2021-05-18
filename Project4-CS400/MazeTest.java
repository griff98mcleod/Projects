// --== CS400 File Header Information ==--
// Name: Griffin McLeod
// Email: gmcleod@wisc.edu
// Team: DG
// Role: Test Engineer 1
// TA: Bao
// Lecturer: Florian
// Notes to Grader: This testsuite tests the functionality of our maze game
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.NoSuchElementException;
import java.util.Scanner;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;


public class MazeTest {
		/**
		 * this tests if the HTML is properly uploaded
		 */
        @Test
        public void testHTML() {
                try {
                    Scanner webpage = new Scanner(new URL("https://pages.cs.wisc.edu/~mcleod/Project4/").openStream());
                    while(webpage.hasNextLine())
                        System.out.println(webpage.nextLine());
                   assertTrue(true);
                } catch(IOException e) { fail();  }
                        }
        /**
         * this tests if the mazes are valid
         * the start index of the maze is a 2 and the end index is a 3, the test 
         * makes sure that both a 2 and a 3 are included in the mazes
         */
        @Test
        public void testMazes() {
        	boolean start1 = false;
        	boolean start2 = false;
        	boolean start3 = false;
        	boolean start4 = false;
        	boolean start5 = false;
        	boolean end1 = false;
        	boolean end2 = false;
        	boolean end3 = false;
        	boolean end4 = false;
        	boolean end5 = false;
        	int[][] maze1 = new int[][] {{2,0,1,1},{1,0,0,1},{1,1,0,1},{1,3,0,1}};
        	int[][] maze2 = new int[][] {{2,0,1,1,1,1,1,1,1},{1,0,0,0,0,0,0,0,3},{1,1,1,1,1,1,1,1,1},{1,1,1,1,1,1,1,1,1},{1,1,1,1,1,1,1,1,1}};
        	int[][] maze3 = new int[][] {{2,0,1,1,1,1,1,1,1},{1,0,0,0,0,0,0,0,1},{1,1,1,1,1,1,1,0,1},{3,0,0,0,0,0,0,0,1},{1,1,1,1,1,1,1,1,1}};
        	int[][] maze4 = new int[][] {{2,0,1,1,1,1,1,1,1},{1,0,0,1,1,1,1,1,1},{1,1,0,1,1,1,1,1,1},{1,1,0,0,0,0,1,1,1},{1,1,1,1,1,1,1,1,1},{1,1,1,1,1,3,1,1,1}};
        	int[][] maze5 = new int[][] {{2,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
        		{1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
        		{1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1},
        		{1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1},
        		{1,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1},
        		{1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1},
        		{1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1},
        		{1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1},
        		{1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1},
        		{1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,3}};
        	int[][][] mazes = {maze1,maze2,maze3,maze4,maze5};
        	for(int maze = 0; maze<mazes.length;maze++) {
        		int[][] whichMaze = mazes[maze];
        		for(int mazeRow = 0;mazeRow<whichMaze.length;mazeRow++) {
        			int[] row = whichMaze[mazeRow]; 
        			for(int val = 0;val<row.length;val++) {
        				int thisVal = row[val];
        				if(thisVal==2) {
        					if(maze==0) {
        						start1=true;
        					}
        					if(maze==1) {
        						start2=true;
        					}
        					if(maze==2) {
        						start3=true;
        					}
        					if(maze==3) {
        						start4=true;
        					}
        					if(maze==4) {
        						start5=true;
        					}
        				}
        				if(thisVal==3) {
            				if(maze==0) {
            					end1=true;
            				}
            				if(maze==1) {
            					end2=true;
            				}
            				if(maze==2) {
            					end3=true;
            				}
            				if(maze==3) {
            					end4=true;
            				}
            				if(maze==4) {
            					end5=true;
            				}
        				}
        			}
        		}
        	}
        	boolean[] startVals = {start1,start2,start3,start4,start5};
        	boolean[] endVals = {end1,end2,end3,end4,end5};
        	for(int i=0;i<startVals.length;i++) {
        		assertTrue(startVals[i]);
        		assertTrue(endVals[i]);
        	}
        		
        }
        }
	
