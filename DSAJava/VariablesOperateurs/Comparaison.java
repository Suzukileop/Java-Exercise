

public class Comparaison {
    public static void main(String[] args) {
        int a = 65;
        char b = 'A';
        double c = 65.0;

        // Caractere 
        System.out.println("int 65 == char 'A' : " + (a == b)); // true 
        System.out.println("int 65 > char 'A' : " + (a > b)); // false
        System.out.println("int 64 < char 'A' : " + (a < b)); // true 

        // entier et double 
        System.out.println("int 65 == double 65.0 : " + (a == c)); //true
        System.out.println("\nint 65 != double 65.1 : " + (a != 5.1)); // true

        // chat : 
        // 6. Comparaisons qui ne fonctionnent pas
        boolean bool = true;
        // System.out.println(bool == 1); // Erreur de compilation
        // Java est un langage fortement type pas comme le C/C++ qui acceptent : false = 1 et true = 0
        
        String str = "65";
        // System.out.println(a == str); // Erreur de compilation
        // String est un objet donc le str est une reference plus precisement une adresse vers l'objet String 
    }
    
}
