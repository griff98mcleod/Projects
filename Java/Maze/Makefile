
testsuite: junit5
        javac -cp .:junit5.jar MazeTest.java
test: testsuite
        java -jar junit5.jar --class-path . --scan-classpath --details tree 
clean:
	$(RM) *.class
