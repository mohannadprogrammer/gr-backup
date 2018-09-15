import org.junit.Test;
import static org.junit.Assert.assertEquals;

public class TestJunit {
   @Test	
   public void testAdd() {
      String str = "Junit is working fine";
      assertEquals("1Junit is working fine",str);
   }
   @Test	
   public void testAdd1() {
      String str = "Junit is working fine";
      assertEquals("Junit is working fine",str);
   }

	
}