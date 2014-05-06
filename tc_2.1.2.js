/* 
    Author: Arko
    Description:    This is a casperjs automated test script for logging out of RCloud and then logging out
                    of Github 
                    
    
*/

// Begin Tests 


casper.test.begin("Test case_2.1.2", 6, function suite(test) {
	var x= require('casper').selectXPath;
    casper.start('http://127.0.0.1:8080/main.html', function() {
    	this.wait(2000);
		siteName=this.getTitle();
		this.wait(2000);
		this.test.assertTitle(
    'RCloud',
    siteName + ' has the correct title');

	});
	
	casper.then(function() {
		this.test.assertExists(
    {type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul[2]/li[3]/a' },
    'Logout option exits');
        
});

    //logging out of RCloud
	casper.thenClick(x('/html/body/div[2]/div/div[2]/ul[2]/li[3]/a'), function(){
	     console.log('Logging out of RCloud');
	     this.wait(10000);
	     //casper.waitForUrl('http://127.0.0.1:8080/goodbye.R'); currently auto redirect is not working
	    
     });
     
     casper.thenOpen('http://127.0.0.1:8080/goodbye.R', function() {
		 this.echo(this.getCurrentUrl(),'page has opened');
		 this.test.assertExists(
    {type: 'xpath', path: '/html/body/div[2]/p/a' },
    'Log Back In option exists'
    );
		this.test.assertExists(
    {type: 'xpath', path: '/html/body/div[2]/p[2]/a[2]' },
    'Github logout option exists'
    );
	});
	
	//logging out of Github
	casper.thenClick(x('/html/body/div[2]/p[2]/a[2]'), function(){
	     console.log('Clicking on Github Logging Out option');
	        
     });
     
     casper.thenOpen('https://github.com/logout', function() {
		 this.echo(this.getCurrentUrl(),'page has opened');
		 this.test.assertExists(
    {type: 'xpath', path: '/html/body/div/div[3]/div/div/form/div[3]/input' },
    'Sign Out of Github option exists'
    );
		test.assertTextExists("Are you sure you want to sign out?");
	});
    
    casper.thenClick(x('/html/body/div/div[3]/div/div/form/div[3]/input'), function(){
	     console.log('Logging out of GitHub');
	     this.wait(2000);
	     	        
     }); 
     
     
	
	    
    casper.run(function() {
        test.done();
    });
    
}); //test.begin ends

// End Tests 
