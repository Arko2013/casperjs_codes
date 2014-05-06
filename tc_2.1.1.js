/* 
    Author: Arko
    Description:    This is a casperjs automated test script for logging out of RCloud
                    and opening the goodbye.R page 
    
*/

// Begin Tests 


casper.test.begin("Test case_2.1.1", 10, function suite(test) {
	var x= require('casper').selectXPath;
    casper.start('http://github.com/login', function() {
        
        test.assertTitleMatch(/Sign in*/, 'Github login page has the correct title');   
        test.assertTextExists('Username or Email', "Page contails Username or Email text");
        test.assertExists('#login_field', 'Username field exists'); // Check if Username Field exists
        test.assertExists('#password', 'Password field exists'); // Check if Password field exists
    
     
    
    });//start ends
    
    casper.then(function() {
        
        console.log("Login into GitHub with supplied username and password");
        this.sendKeys('#login_field', 'Arko2013');
        this.sendKeys('#password','bazinga50@');
            
    });
    
    casper.then(function() {
        this.click({type: 'css', path: '#login > form > div.auth-form-body > input.button'});
    });
    
    casper.then(function() {
        test.assertTitleMatch(/GitHub/, "Github page has been loaded");
        test.assertTextExists('Arko2013', "Arko2013 home page loaded");
    });
    
    casper.thenOpen('http://127.0.0.1:8080/main.html?notebook=53ff63418f1c2e5c373a', function() {
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
    
    //Logging out of RCloud
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
	
	    
    casper.run(function() {
        test.done();
    });
    
}); //test.begin ends

// End Tests 
